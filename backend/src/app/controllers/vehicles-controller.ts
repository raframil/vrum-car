import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { VehiclesSeed } from "../../database/seeds/vehicles.seed";
import User from "../models/user";

import Vehicle from "../models/vehicle";

class VehiclesController {
  async index(req: Request, res: Response) {
    const repository = getRepository(Vehicle);
    let vehicles = [];

    const { query } = req.query;

    if (query === "alugados") {
      vehicles = await repository.find({ relations: ["user"] });

      const filterRented = vehicles.filter((vehicle) => {
        return vehicle.user ? vehicle : null;
      });

      return res.json(filterRented);
    }

    if (query === "disponiveis") {
      vehicles = await repository.find({ relations: ["user"] });
      const filterNonRented = vehicles.filter((vehicle) => {
        return vehicle.user ? null : vehicle;
      });

      return res.json(filterNonRented);
    }

    vehicles = await repository.find({ relations: ["user"] });
    return res.json(vehicles);
  }

  rentalControl(req: Request, res: Response) {
    const { action } = req.body;

    if (action !== "rent" && action !== "return") {
      return res
        .json({ message: "Ação inválida. Ações válidas: 'rent' || 'return" })
        .status(400);
    }

    if (action === "rent") {
      return this.rentCar(req, res);
    }

    if (action === "return") {
      return this.returnRental(req, res);
    }
  }

  async returnRental(req: Request, res: Response) {
    const vehicleRepository = getRepository(Vehicle);
    const userRepository = getRepository(User);
    const userId = req.userId;

    const vehicleId = req.body.vehicleId as string;

    if (!vehicleId) {
      return res.status(400).json({ message: "vehicleId é obrigatório" });
    }

    const vehicle = await vehicleRepository.findOneOrFail({
      where: { id: vehicleId },
      relations: ["user"],
    });

    if (!vehicle) {
      return res.status(404).json({ message: "Veículo não encontrado" });
    }

    if (vehicle.user.id !== userId) {
      return res.status(400).json({
        message: "Você não pode devolver um veículo de outra pessoa",
      });
    }

    const returnVehicle = await userRepository.save({
      id: userId,
      vehicle_id: null,
    });

    return res.json({ message: "Carro devolvido com sucesso", returnVehicle });
  }

  async rentCar(req: Request, res: Response) {
    const vehicleRepository = getRepository(Vehicle);
    const userRepository = getRepository(User);
    const userId = req.userId;

    const vehicleId = req.body.vehicleId as string;

    if (!vehicleId) {
      return res.status(400).json({ message: "vehicleId é obrigatório" });
    }

    const vehicle = await vehicleRepository.findOneOrFail({
      where: { id: vehicleId },
      relations: ["user"],
    });

    if (!vehicle) {
      return res.status(404).json({ message: "Veículo não encontrado" });
    }

    if (vehicle.user) {
      return res.status(400).json({ message: "Veículo já alugado" });
    }

    const rentVehicle = await userRepository.save({
      id: userId,
      vehicle_id: vehicleId,
    });

    return res.json({ message: "Carro alugado com sucesso", rentVehicle });
  }

  async store(req: Request, res: Response) {
    const repository = getRepository(Vehicle);

    const {
      model,
      brand,
      year,
      color,
      vehicle_type,
      plate_number,
      mileage,
      image,
    } = req.body;

    const hasVehicle = await repository.findOne({ where: { plate_number } });

    if (hasVehicle) {
      return res.status(409).json({ message: "Veículo já registrado" });
    }

    const vehicle = repository.create({
      model,
      brand,
      year,
      color,
      vehicle_type,
      plate_number,
      mileage,
      image,
    });
    await repository.save(vehicle);

    return res.json(vehicle);
  }

  async seedDatabase(req: Request, res: Response) {
    const repository = getRepository(Vehicle);
    const vehiclesToCreate = VehiclesSeed;

    let createdVehicles = [];

    for await (const vehicle of vehiclesToCreate) {
      const plateNumber = vehicle.plate_number;
      const hasVehicle = await repository.findOne({
        where: { plate_number: plateNumber },
      });

      if (!hasVehicle) {
        const createVehicle = repository.create(vehiclesToCreate);
        await repository.save(createVehicle);
        createdVehicles.push(createVehicle);
      }

      if (hasVehicle) {
        createdVehicles.push({
          message: `Veículo de placa ${plateNumber} já registrado`,
        });
      }
    }

    return res.json(createdVehicles);
  }
}

export default new VehiclesController();
