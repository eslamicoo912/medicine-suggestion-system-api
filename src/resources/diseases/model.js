import mongoose from "mongoose";

const DiseaseSchema = mongoose.Schema({
  name: String,
  medicines: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Medicine",
    },
  ],
});

const Disease = mongoose.model("Disease", DiseaseSchema);
export default Disease;
