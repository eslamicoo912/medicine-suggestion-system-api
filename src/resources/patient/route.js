import express from "express";
import {
  getPatients,
  deleteUser,
  editUser,
  getPatientById,
  getPatientBySearch,
} from "./controller.js";

const routes = express.Router();

routes.get("/", getPatients);
routes.get("/id/:id", getPatientById);
routes.get("/search", getPatientBySearch);
routes.patch("/:id", editUser);
routes.delete("/:id", deleteUser);

export default routes;
