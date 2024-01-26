import mongoose from "mongoose";
import bcrypt from "bcrypt";

const PatientSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "The patient name is required"],
  },

  email: {
    type: String,
    required: [true, "The patient email is required"],
    unique: true,
  },

  gender: {
    type: String,
    enum: ["male", "female"],
    required: [true, "The patient gender is required"],
  },

  age: {
    type: Number,
    required: [true, "The patient age is required"],
  },

  password: {
    type: String,
    required: [true, "The patient password is required"],
  },

  passwordConfirm: {
    type: String,
    required: [true, "The patient name is required"],
  },

  pregnant: {
    type: Boolean,
    default: false,
  },
  diabetic: {
    type: Boolean,
    default: false,
  },
  pressure: {
    type: Boolean,
    default: false,
  },
  heart: {
    type: Boolean,
    default: false,
  },
  disease: String,
  current_medicine: {
    type: mongoose.Schema.ObjectId,
    ref: "Medicine",
  },
});

PatientSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.passwordConfirm = undefined;
  next();
});

/*PatientSchema.methods.correctPassword = async function (
  candidatePasssword,
  userPassword
) {
  bcrypt.compare(candidatePasssword, userPassword, function (err, match) {
    if (err) {
      console.log(err);
      return false;
    }
    if (match) return true;
  });
};*/

const Patient = mongoose.model("Patient", PatientSchema);
export default Patient;
