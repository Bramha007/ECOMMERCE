import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // Set jwt as HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true.valueOf,
    secure: process.env.NODE_ENV !== "development" ? true : false,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 30 * 1000,
  });
};

export default generateToken;
