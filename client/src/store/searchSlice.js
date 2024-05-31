import { createSlice } from "@reduxjs/toolkit";
/* Movie and TV Shows Search Items Store */
const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchItems: null,
  },
  reducers: {
    getSearchItems: (state, action) => {
      state.searchItems = action.payload;
    },
  },
});

export const { getSearchItems } = searchSlice.actions;
export default searchSlice.reducer;
