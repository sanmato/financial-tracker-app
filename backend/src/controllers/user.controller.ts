import { Request, Response } from "express";
import User from "../models/User.model";
import generateToken from "../utils/generateToken";

//@desc Register a new user
//@route POST /api/users/register

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // 1. Verify that email does not already exist
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists!" });
    }
    // 2. Create new user
    // ('pre-save)' hook in User.model.ts will hash the password
    const user = await User.create({ username: name, email, password });

    //3. Respond (exclude password)
    if (user) {
      res.status(201).json({
        data: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
        message: "User registered successfully",
      });
    } else {
      throw new Error("Invalid user data");
    }
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(
        (val: any) => val.message
      );
      return res.status(400).json({ message: messages.join(", ") });
    }
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//@desc Login user
//@route POST /api/users/login

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    //1. Find user by email
    // Use .select('+password') to force including password field (which is excluded by default)
    const user = await User.findOne({ email }).select("+password");

    //2. If user exists, compare passwords
    //'user &&' prevents error if user is null
    //'user.comparePassword' is a method defined in User.model.ts
    if (user && (await user.comparePassword(password))) {
      //3. If everything is ok, generate JWT token
      res.status(200).json({
        success: true,
        data: {
          _id: user._id,
          name: user.username,
          email: user.email,
          token: generateToken(user.id), // Generate JWT token here
        },
        message: "Login successful",
      });
    } else {
      //If user not found or password does not match
      res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
