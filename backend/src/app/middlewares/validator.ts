import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export default function validate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: { [x: string]: any }[] = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
}
