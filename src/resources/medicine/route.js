import {
  createMedicine,
  deleteMedicine,
  editMedicine,
  getMedicineById,
  getMedicines,
} from "./controller.js";
import { Router } from "express";

const routes = Router();

routes.post("/", createMedicine);
routes.get("/", getMedicines);
routes.get("/id/:id", getMedicineById);
//routes.get("/search", getPatientBySearch);
routes.patch("/:id", editMedicine);
routes.delete("/:id", deleteMedicine);

export default routes;
