import { body } from "express-validator";

export default function createVehicleValidationRules() {
  return [
    body("model").isString(),
    body("brand").isString(),
    body("year")
      .isNumeric()
      .isLength({ max: 4 })
      .withMessage("Ano deve ter no máximo 4 caracteres"),
    body("color").isString(),
    body("vehicle_type").isString(),
    body("plate_number").isString().isLength({ max: 7 }),
    body("mileage").isNumeric(),
    body("image").optional({ nullable: true }).isString(),
  ];
}
