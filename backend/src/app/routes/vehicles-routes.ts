import { Router } from "express";
import validate from "../middlewares/validator";
import authMiddleware from "../middlewares/auth-middleware";
import VehiclesController from "../controllers/vehicles-controller";
import createVehicleValidationRules from "../validators/vehicle-validator";
import rentOrReturnVehicleValidationRules from "../validators/rent-validator";

export function init(router: Router) {
  router.post(
    "/vehicles",
    authMiddleware,
    createVehicleValidationRules(),
    validate,
    VehiclesController.store
  );

  router.post("/vehicles/seed", VehiclesController.seedDatabase);

  router.patch(
    "/vehicles",
    authMiddleware,
    rentOrReturnVehicleValidationRules(),
    VehiclesController.rentalControl.bind(VehiclesController)
  );

  router.get("/vehicles", authMiddleware, VehiclesController.index);
}
