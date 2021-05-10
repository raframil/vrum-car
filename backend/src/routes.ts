import { Router } from "express";

import * as UserRoutes from "./app/routes/user-routes";
import * as VehicleRoutes from "./app/routes/vehicles-routes";

export function init() {
  const router = Router();

  UserRoutes.init(router);
  VehicleRoutes.init(router);

  return router;
}
