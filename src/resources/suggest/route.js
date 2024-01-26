import { Router } from "express";
import { suggest_medicine } from "./controller.js";
import { userAuth } from "../../middleware/userAuth.js";

const routes = Router();

routes.post("/", userAuth, suggest_medicine);

export default routes;
