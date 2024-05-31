import { createSlice } from "@reduxjs/toolkit";
/* User Store */
const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    authStatus: false,
    loading: false,
    bookmarkMovies: [],
    bookmarkTVShow: [],
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAuthStatus: (state, action) => {
      state.authStatus = action.payload;
    },
    setBookmarkMovies: (state, action) => {
      state.bookmarkMovies.push(action.payload);
    },
    setBookmarkTVShow: (state, action) => {
      state.bookmarkTVShow.push(action.payload);
    },
  },
});

export const {
  setAuthUser,
  setLoading,
  setAuthStatus,
  setBookmarkMovies,
  setBookmarkTVShow,
} = userSlice.actions;

export default userSlice.reducer;
