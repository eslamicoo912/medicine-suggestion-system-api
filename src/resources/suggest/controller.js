import Disease from "../diseases/model.js";
import Patient from "../patient/model.js";
import catchAsync from "../../services/catchAsync.js";

export const suggest_medicine = catchAsync(async (req, res, next) => {
  // user inputs => disease, pregnant, current medicine (interactions, contraindications, material)
  const patient = await Patient.findById(req.user._id).populate({
    path: "current_medicine",
  });

  // check database for the user's disease to get the medicines
  const disease = await Disease.findOne({ name: patient.disease }).populate({
    path: "medicines",
  });

  // if the user don't have a current medicine => suggest the disease medicines got from the database
  if (!patient.current_medicine)
    return res.json({
      medicines: disease.medicine,
    });

  // if the user have a current medicine => get the medicine that it's interactions don't include the current medicine material and its contraindications don't include the user's disease and pregnant

  let safe_medicines = [];
  disease.medicines.forEach((m) => {
    if (
      !m.interactions.includes(patient.current_medicine.effective_material) &&
      m.name !== patient.current_medicine.name
    )
      safe_medicines.push(m);
  });

  if (!safe_medicines.length)
    return res.json({
      message:
        "The available medicines are unsafe to use with your current medicine because of interactions between effective materials",
    });

  return res.json({
    message: "success",
    data: safe_medicines,
  });
});
