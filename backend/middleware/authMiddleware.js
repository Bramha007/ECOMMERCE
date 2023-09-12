import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandlerMiddleware.js";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw Error("Not Authrorized, token failed");
    }
  } else {
    res.status(401);
    throw Error("Not Authrorized, no token");
  }
});

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) next();
  else {
    res.status(401);
    throw Error("Not Authorized");
  }
};

export { admin, protect };
