import { Router } from "express";
import validate from "../middlewares/validator";
import authMiddleware from "../middlewares/auth-middleware";
import AuthController from "../controllers/auth-controller";
import UserController from "../controllers/user-controller";
import userValidationRules from "../validators/auth-validator";
import createUserValidationRules from "../validators/user-validator";

export function init(router: Router) {
  router.post(
    "/auth",
    userValidationRules(),
    validate,
    AuthController.authenticate
  );
  router.post(
    "/users",
    createUserValidationRules(),
    validate,
    UserController.store
  );

  router.get("/users", authMiddleware, UserController.index);
}
