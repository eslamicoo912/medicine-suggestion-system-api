import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import PatientRoutes from "./resources/patient/route.js";
import AuthRoutes from "./resources/auth/route.js";
import MedicineRoutes from "./resources/medicine/route.js";
import DiseaseRoutes from "./resources/diseases/route.js";
import SuggestRoutes from "./resources/suggest/route.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

// middleware
app.use(express.json());
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("SERVER RUNNING");
});
app.use("/api/patients", PatientRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/medicine", MedicineRoutes);
app.use("/api/disease", DiseaseRoutes);
app.use("/api/suggest", SuggestRoutes);

// database connection
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`app listening for port ${port}`);
    });
  })
  .catch((err) => console.log(err));
