import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";
import allowedMatric from "../data/matric.js";

export const signup = async (req, res) => {
  const { fullName, username, email, password, matric } = req.body;
  try {
    if (!fullName || !email || !password || !matric) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    
    const locateMatric = allowedMatric.find((item) => item === matric )
    
    if (!locateMatric) {
      return res.status(400).json({ message: "Matric entered invalid" });
    }

    const matric_check = await User.findOne({ matric })
    if (matric_check) return res.status(400).json({message: "Matric number already exists, login."})

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    const username_exist = await User.findOne({ username });
    if (username_exist) return res.status(400).json({ message: "Username already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      username,
      email,
      matric,
      password: hashedPassword,
      profilePic: ""
    });

    if (newUser) {
      // generate jwt token here
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        email: newUser.email,
        matric: newUser.matric,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      matric: user.matric,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { fullName, email, profilePic } = req.body;
    const userId = req.user._id;

    let updatedFields = {};

    // Check if new email is already used by another user
    if (email) {
      const existingUser = await User.findOne({ email, _id: { $ne: userId } });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use by another account" });
      }
      updatedFields.email = email;
    }

    if (fullName) updatedFields.fullName = fullName;

    if (profilePic) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        updatedFields.profilePic = uploadResponse.secure_url;
      } catch (err) {
        return res.status(400).json({ message: "Image upload failed" });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, { new: true });

    res.status(200).json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      username: updatedUser.username,
      email: updatedUser.email,
      matric: updatedUser.matric,
      profilePic: updatedUser.profilePic,
    });
  } catch (error) {
    console.error("Error in updateProfile controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
