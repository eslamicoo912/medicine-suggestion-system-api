import jwt from "jsonwebtoken";
import catchAsync from "../services/catchAsync.js";
import AppError from "../services/appError.js";
import dotenv from "dotenv";
import { promisify } from "util";
import Patient from "../resources/patient/model.js";

dotenv.config();

export const userAuth = catchAsync(async (req, res, next) => {
  const tokenAuth = req.headers.authorization;

  if (!tokenAuth)
    return next(
      new AppError("No token found", 401, "No token found, please login")
    );

  let token = tokenAuth.split(" ")[1];

  const decoded = await promisify(jwt.verify)(token, process.env.SECRET_TOKEN);

  const user = await Patient.findById(decoded.id).select("-password");

  if (!user) return next(new AppError("No user found", 404, "new user found"));

  req.user = user;

  next();
});
