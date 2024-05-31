/* User Model structure */
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    profilePhoto: { type: String, default: "" },
    bookmarkedMovies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],
    bookmarkedTVShows: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TVShow",
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
