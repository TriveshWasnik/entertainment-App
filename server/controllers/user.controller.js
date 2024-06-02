import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signupUser = async function (req, res) {
  try {
    // Get email and Password from frontend
    const { email, password, repassword } = req.body;

    // Validation - Not empty field
    if (
      [email, password, repassword].some((field) => {
        return field?.trim() === "";
      })
    ) {
      return res.status(401).json({ message: "Can't be empty" });
    }

    // Check Password is same as confirm password
    if (password !== repassword) {
      return res.status(401).json({ message: "Password does not match" });
    }

    // check if user already exists
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(401).json({ message: "Email already exists" });
    }

    const hashPassword = await bcryptjs.hash(password, 10);

    // create an User Object and stored the user record in MongoDB
    const newUser = await User.create({
      email: email,
      password: hashPassword,
      profilePhoto: "https://avatar.iran.liara.run/public/boy",
    });

    // check for user creation
    if (!newUser) {
      return res.status(500).json({
        message: "Something went wrong while signup the user",
      });
    }
    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    // get data from frontend Login Form
    const { email, password } = req.body;
    // Check Username and Password
    if (!email || !password) {
      return res.status(401).json({ message: "Can't be empty" });
    }
    // find the user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }

    // Password Check
    const isPasswordMatch = await bcryptjs.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid user credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    // send cookie on browser
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .set("Authorization", `Bearer ${process.env.TMDB_TOKEN}`)
      .json({
        message: "User Logged In successfully",
        success: true,
        user: {
          _id: user._id,
          email: user.email,
          profilePhoto: user.profilePhoto,
        },
      });
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = async function (req, res) {
  try {
    return res
      .status(200)
      .cookie("token", "", { httpOnly: true, secure: true, maxAge: 0 })
      .set("Authorization", "")
      .json({ message: "User logged out successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};
