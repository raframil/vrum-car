import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user";

class AuthController {
  async authenticate(req: Request, res: Response) {
    const repository = getRepository(User);
    const jwtSecret = process.env.JWT_SECRET as string;

    const { email, password } = req.body;

    const user = await repository.findOne({ where: { email } });

    if (!user) {
      return res.sendStatus(401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.sendStatus(401);
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      jwtSecret,
      { expiresIn: "1d" }
    );

    return res.json({
      user,
      token,
    });
  }
}

export default new AuthController();
