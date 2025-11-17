// backend/src/models/User.model.ts
import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

// Define the User interface extending Document

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Moongoose schema for User
const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Name is required"],
      trim: true, // Remove whitespace
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // Ensure unique emails
      trim: true, // Remove whitespace
      lowercase: true, // Convert to lowercase
      match: [/\S+@\S+\.\S+/, "Email is invalid"], // Basic email validation
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false, // Exclude password from queries by default
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Mongoose pre-save hook to hash password
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// mongoose method to compare passwords
UserSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Model creation
const User = model<IUser>("User", UserSchema);
export default User;
