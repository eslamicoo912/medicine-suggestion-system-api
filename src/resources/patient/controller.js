import Patient from "./model.js";
import catchAsync from "../../services/catchAsync.js";

export const getPatients = catchAsync(async (req, res) => {
  const patients = await Patient.find();

  if (!patients.length)
    return res.json({
      message: "No patients found",
    });

  return res.json({
    data: patients,
  });
});

export const getPatientById = catchAsync(async (req, res) => {
  const patient = await Patient.findById(req.params.id).populate({
    path: "current_medicine",
  });

  if (!patient)
    return res.json({
      message: "No patients found",
    });

  return res.json({
    data: patient,
  });
});

export const getPatientBySearch = catchAsync(async (req, res) => {
  let patient = {};

  if (req.query.name) patient = await Patient.findOne({ name: req.query.name }); // user object

  if (req.query.email)
    patient = await Patient.findOne({ email: req.query.email }); // user object

  if (req.query.disease)
    patient = await Patient.find({ disease: req.query.disease }); // users array

  if (req.query.medicine)
    patient = await Patient.find({ medicine: req.query.medicine }); // users array

  if (!patient)
    return res.json({
      message: "No patient found",
    });

  return res.json({
    data: patient,
  });
});

export const editUser = catchAsync(async (req, res) => {
  const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json({
    message: "Patient updated successfully",
    data: patient,
  });
});

export const deleteUser = catchAsync(async (req, res) => {
  await Patient.findByIdAndDelete(req.params.id);
  res.json({
    message: "Patient deleted successfully",
  });
});
