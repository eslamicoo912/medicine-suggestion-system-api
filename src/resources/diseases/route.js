import {
  createDisease,
  deleteDisease,
  editDisease,
  getDiseaseById,
  getDiseases,
} from "./controller.js";
import { Router } from "express";

const routes = Router();

routes.post("/", createDisease);
routes.get("/", getDiseases);
routes.get("/id/:id", getDiseaseById);
//routes.get("/search", getPatientBySearch);
routes.patch("/:id", editDisease);
routes.delete("/:id", deleteDisease);

export default routes;
