import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const signToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET_TOKEN);
};
