import { body } from "express-validator";

export default function rentOrReturnVehicleValidationRules() {
  return [body("action").isString(), body("vehicleId").isUUID()];
}
