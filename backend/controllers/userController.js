import asyncHandler from "../middleware/asyncHandlerMiddleware.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc Auth user and get token
// route POST /api/v1/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //validate email and password
  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter email and password");
  }
  //check for user
  const user = await User.findOne({ email: email }).select("+password");

  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  //Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
  if (user && isMatch) {
    console.log(user);
    generateToken(res, user);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }
});

// @desc Register a user
// route POST /api/v1/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(400);
    throw new Error(`User with ${email} already exists`);
  }
  const newUser = await User.create({ name, email, password });
  if (newUser) {
    generateToken(res, newUser);
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User data");
  }
});

// @desc Logout user/ clear cookie
// route POST /api/v1/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true.valueOf,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout successful" });
});

// @desc Get user profile
// route GET /api/v1/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Update user profile
// route PUT /api/v1/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
  }
  const updatedUser = await user.save();
  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  });
});

// @desc Get all users
// route GET /api/v1/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get all users");
});

// @desc Get a user by id
// route GET /api/v1/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  res.send("get a user by id");
});

// @desc Delete a user
// route DELETE /api/v1/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete a user");
});

// @desc Update a user
// route PUT /api/v1/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("update a user by id");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
