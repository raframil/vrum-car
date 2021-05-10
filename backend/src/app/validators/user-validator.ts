import { body } from "express-validator";

export default function createUserValidationRules() {
  return [
    body("name").isString(),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }).isString(),
  ];
}
