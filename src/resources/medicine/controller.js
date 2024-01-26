import AppError from "../../services/appError.js";
import Medicine from "./model.js";
import catchAsync from "../../services/catchAsync.js";

export const getMedicines = catchAsync(async (req, res) => {
  const medicines = await Medicine.find();

  if (!medicines.length)
    return res.json({
      message: "No medicined found",
    });

  return res.json({
    data: medicines,
  });
});

export const getMedicineById = catchAsync(async (req, res) => {
  const medicine = await Medicine.findById(req.params.id);

  if (!medicine)
    return res.json({
      message: "No medicine found",
    });

  return res.json({
    data: medicine,
  });
});

export const createMedicine = catchAsync(async (req, res, next) => {
  const medicineFound = await Medicine.findOne({ name: req.body.name });

  if (medicineFound)
    return next(
      new AppError("Medicine exists", 409, "The medicine already exists")
    );

  const medicine = new Medicine(req.body);
  await medicine.save();

  return res.json({
    message: "medicine created successfully",
    data: medicine,
  });
});

export const editMedicine = catchAsync(async (req, res) => {
  const medicineFound = await Medicine.findOne({ name: req.body.name });

  if (medicineFound)
    return next(
      new AppError("Medicine exists", 409, "The medicine already exists")
    );

  const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  return res.json({
    message: "medicine updated successfully",
    data: medicine,
  });
});

export const deleteMedicine = catchAsync(async (req, res) => {
  await Medicine.findByIdAndDelete(req.params.id);

  return res.json({
    message: "medicine deleted successfully",
  });
});
