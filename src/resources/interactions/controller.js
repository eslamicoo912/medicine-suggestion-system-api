import Interaction from "./model";
import catchAsync from "../../services/catchAsync";

export const getInteractions = catchAsync(async (req, res) => {
  const interactions = await Interaction.find();

  if (!interactions.length)
    return res.json({
      message: "No Interactiond found",
    });

  return res.json({
    data: interactions,
  });
});

export const getInteractionById = catchAsync(async (req, res) => {
  const interaction = await Interaction.findById(req.params.id);

  if (interaction)
    return res.json({
      message: "No Interaction found",
    });

  return res.json({
    data: interaction,
  });
});

export const createInteraction = catchAsync(async (req, res, next) => {
  const interaction = new Interaction(req.body);
  await interaction.save();

  return res.json({
    message: "Interaction created successfully",
    data: interaction,
  });
});

export const editInteraction = catchAsync(async (req, res) => {
  const interactionFound = await Interaction.findOne({ name: req.body.name });

  if (interactionFound)
    return next(
      new AppError("Interaction exists", 409, "The Interaction already exists")
    );

  const interaction = await Interaction.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  return res.json({
    message: "Interaction updated successfully",
    data: interaction,
  });
});

export const deleteInteraction = catchAsync(async (req, res) => {
  await Interaction.findByIdAndDelete(req.params.id);

  return res.json({
    message: "Interaction deleted successfully",
  });
});
