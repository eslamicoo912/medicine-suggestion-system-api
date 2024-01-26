import AppError from "../../services/appError.js";
import catchAsync from "../../services/catchAsync.js";
import { signToken } from "../../services/token.js";
import Patient from "../patient/model.js";
import bcrypt from "bcrypt";

export const register = catchAsync(async (req, res, next) => {
  const { name, email, gender, age, password, passwordConfirm } = req.body;

  // check if email exists
  const checkPatientFound = await Patient.findOne({ email });
  if (checkPatientFound)
    return next(
      new AppError(
        "Patient already exists, please login",
        409,
        "Patient already exists, please login"
      )
    );

  // check password match
  if (password !== passwordConfirm)
    return next(
      new AppError(
        "Password confirmation error",
        400,
        "Password confirmation does not match the password"
      )
    );

  const patient = new Patient(req.body);
  await patient.save();

  return res.json({
    message: "Patient registered",
    data: patient,
  });
});

export const login = catchAsync(async (req, res, next) => {
  // check if email registered or not
  const userFound = await Patient.findOne({ email: req.body.email }).select(
    "name email age gender"
  );
  if (!userFound)
    return next(
      new AppError(
        "Patient not registered",
        404,
        "Patient not registered, please register first"
      )
    );

  console.log(userFound);

  // check the correct password
  bcrypt
    .compare(req.body.password, userFound.password)
    .then((match) => {
      if (!match)
        return next(new AppError("Wrong password", 400, "Wrong password"));
    })
    .catch((err) => console.log(err));

  // generate token
  const token = signToken({
    id: userFound._id,
    name: userFound.name,
    email: userFound.email,
  });

  res.json({
    message: "Logged in successfully",
    token,
    data: userFound,
  });
});
