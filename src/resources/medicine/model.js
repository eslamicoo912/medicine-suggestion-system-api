import mongoose from "mongoose";

const MedicineSchema = mongoose.Schema({
  name: String,
  category: String,
  side_effects: Array,
  use: String,
  substitute: String,
  effective_material: String,
  contraindications: Array,
  interactions: Array,
});

const Medicine = mongoose.model("Medicine", MedicineSchema);
export default Medicine;
