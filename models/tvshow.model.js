/* TV Show Model structure */
import mongoose from "mongoose";

const tvshowSchema = new mongoose.Schema({
  id: { type: Number },
  name: { type: String },
  overview: { type: String },
  poster_path: { type: String },
  first_air_date: { type: String },
  adult: { type: Boolean },
});

export const TVShow = mongoose.model("TVShow", tvshowSchema);
