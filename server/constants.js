import dotenv from "dotenv";
dotenv.config({ path: ".env" });

export const TMDB_BASE_PATH = "https://api.themoviedb.org/3";
export const API_Option = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjQ2ZjA5ZTgzZDhmMjZmYjQwMDcyMzIiLCJpYXQiOjE3MTczMjExODIsImV4cCI6MTcxNzQwNzU4Mn0.ix0e9jKtV7GUWHiYiwaD_6nrSEcPG6ajd8muQN4eX_o 
    `,
  },
};

////${process.env.TMDB_TOKEN}
