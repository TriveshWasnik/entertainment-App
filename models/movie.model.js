/* Movie Model structure */
import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  id: { type: Number },
  title: { type: String },
  overview: { type: String },
  poster_path: { type: String },
  release_date: { type: String },
  adult: { type: Boolean },
});

export const Movie = mongoose.model("Movie", movieSchema);
