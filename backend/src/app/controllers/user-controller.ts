import { Request, Response } from "express";
import { getRepository } from "typeorm";

import User from "../models/user";

class UserController {
  async index(req: Request, res: Response) {
    const repository = getRepository(User);

    const user = await repository.findOne({ where: { id: req.userId } });
    return res.send(user);
  }

  async store(req: Request, res: Response) {
    const repository = getRepository(User);

    const { name, email, password } = req.body;

    const hasUser = await repository.findOne({ where: { email } });

    if (hasUser) {
      return res.status(409).json({ message: "Usuário já registrado" });
    }

    const user = repository.create({ name, email, password });
    await repository.save(user);

    return res.json(user);
  }
}

export default new UserController();
