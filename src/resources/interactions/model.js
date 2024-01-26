import mongoose from "mongoose";

const InteractionSchema = mongoose.Schema({
  first_material: String,
  second_material: String,
  effects: String,
});

const Interaction = mongoose.model("Interaction", InteractionSchema);
export default Interaction;
