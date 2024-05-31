import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

export const TMDB_BASE_PATH = "https://api.themoviedb.org/3";
export const API_Option = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_TOKEN} `,
  },
};
