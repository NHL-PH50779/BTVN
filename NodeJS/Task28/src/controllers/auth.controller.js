import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../configs/dotenvConfig.js";

import User from "../models/User.js";
import handleAsync from "../utils/handleAsync.js";
import createError from "../utils/createError.js";
import createResponse from "../utils/createResponse.js";

export const signUp = handleAsync(async (req, res) => {
  const { email, password, fullname } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) return createError(res, 400, "Email đã được sử dụng!");

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const user = await User.create({ email, password: hash, fullname });

  user.password = undefined;

  createResponse(res, 201, "Dang ky thanh cong", user);
});

export const signIn = handleAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return createError(res, 400, "Email hoặc mật khẩu không đúng!");
  }

  const isMatched = bcrypt.compareSync(password, user.password);

  if (!isMatched) {
    return createError(res, 400, "Email hoặc mật khẩu không đúng!");
  }
  const accessToken = jwt.sign(
    { _id: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
  
  const userResponse = {
    _id: user._id,
    email: user.email,
    fullname: user.fullname,
    role: user.role,
    createdAt: user.createdAt,
  };

  createResponse(res, 200, "Đăng nhập thành công", {
    user: userResponse,
    accessToken,
  });
});
