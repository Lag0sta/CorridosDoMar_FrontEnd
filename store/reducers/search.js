import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    fetchData: (state, action) => {
      //enregistre les data envoyé et les range dans l'ordre alphabetique
      state.value = action.payload.sort((a,b) => a.title.localeCompare(b.title));
    },
 
  },
});

export const {
  fetchData,
} = searchSlice.actions;
export default searchSlice.reducer;
