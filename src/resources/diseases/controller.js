import AppError from "../../services/appError.js";
import Disease from "./model.js";
import catchAsync from "../../services/catchAsync.js";

export const getDiseases = catchAsync(async (req, res) => {
  const diseases = await Disease.find().populate({
    path: "medicines",
  });

  if (!diseases.length)
    return res.json({
      message: "No Diseased found",
    });

  return res.json({
    data: diseases,
  });
});

export const getDiseaseById = catchAsync(async (req, res) => {
  const disease = await Disease.findById(req.params.id);

  if (!disease)
    return res.json({
      message: "No Disease found",
    });

  return res.json({
    data: disease,
  });
});

export const createDisease = catchAsync(async (req, res, next) => {
  const diseaseFound = await Disease.findOne({ name: req.body.name });

  if (diseaseFound)
    return next(
      new AppError("Disease exists", 409, "The Disease already exists")
    );

  const disease = new Disease(req.body);
  await disease.save();

  return res.json({
    message: "Disease created successfully",
    data: disease,
  });
});

export const editDisease = catchAsync(async (req, res) => {
  const diseaseFound = await Disease.findOne({ name: req.body.name });

  if (diseaseFound)
    return next(
      new AppError("Disease exists", 409, "The Disease already exists")
    );

  const disease = await Disease.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  return res.json({
    message: "Disease updated successfully",
    data: disease,
  });
});

export const deleteDisease = catchAsync(async (req, res) => {
  await Disease.findByIdAndDelete(req.params.id);

  return res.json({
    message: "Disease deleted successfully",
  });
});
