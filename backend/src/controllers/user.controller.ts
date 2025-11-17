import { Request, Response } from "express";
import User from "../models/User.model";

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
