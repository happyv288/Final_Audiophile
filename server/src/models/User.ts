// Defines the user data stucture in MongoDB using mongoose.
// A "model" is like a blueprint for every user document that will be staored in the database

import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/indexServer";
import bcrypt from "bcryptjs";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email required"],
      unique: true, // No two users can have the same email
      trim: true, // Remove spaces from start and end incase of users mistake
      lowercase: true, //  always store emails in lowercase in the database
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format",
      ], // Regex email validation
    },

    password: {
      type: String,
      required: [true, "Password  is required"],
      minlength: [8, "password must be at least 8 characters"],
    },

    isAdmin: {
      type: Boolean,
      required: true,
      default: false, // New users are not admins by default
    },

    // Optional profile avatar stored as a cloudinary URL
    avatar: {
      type: String,
      default: "",
    },

    // we stored this so we can DELETE the old avatar from cloudinary when the user uploads a new one (to save storage space)
    avatarPublicId: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },
  },

  {
    timestamps: true,
  },
);

// === MIDDLEWARE (RUNS AUTHOMATICALLY BEFORE SAVING) ====
// Pre("save") runs BEFORE a user document is saved to the database
// we use this to hash the passwords so plain text is NEVER STORED
userSchema.pre("save", async function (next) {
  // This refers to the user being saved
  // only hash if the passwords was actually changed
  // this prevents re-hashing an already hashed password
  if (!this.isModified("password")) {
    return;
  }

  // bcrypt create a random "salt" (extra random data)
  const salt = await bcrypt.genSalt(10); // This (10) is the cost  factor - giher = more secure but slower

  // Hash the password with the salt
  this.password = await bcrypt.hash(this.password, salt);
});

// ===== METHODS (Custom functions on the user document) ====
// compare an entered pain-text password with the stored hash
// Returns true if they match, false if they dont

userSchema.methods.matchPassword = async function (
  enteredPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// create and export the user model
// mongoose.model("UserSchema") creates a model named "user"
// MondgoDB will store documets in a collection called "user"(auto-pluralized)

const User = mongoose.model<IUser>("User", userSchema);
export default User;
