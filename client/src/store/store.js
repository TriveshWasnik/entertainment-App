import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import movieSlice from "./movieSlice";
import searchSlice from "./searchSlice";
/* Registered All the Store */
const store = configureStore({
  reducer: {
    user: userSlice,
    movie: movieSlice,
    search: searchSlice,
  },
});

export default store;
