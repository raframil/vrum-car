import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const jwtSecret = process.env.JWT_SECRET as string;
    const data = jwt.verify(token, jwtSecret);

    const { id } = data as TokenPayload;

    req.userId = id;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}
