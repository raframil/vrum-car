import { body } from "express-validator";

export default function userValidationRules() {
  return [
    body("email").isEmail(),
    body("password").isLength({ min: 5 }).isString(),
  ];
}
