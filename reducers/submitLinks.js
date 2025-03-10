import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: []
};

const submitLinksSlice = createSlice({
  name: "submitLinks",
  initialState,
  reducers: {
    add: (state, action) => {
      state.value = [...state.value, action.payload]
    },
    remove: (state, action) => {
        state.value.splice(action.payload, 1);
    },
   
    clear: (state) => {
        state.value = []
    },
  },
});

export const {
  add,
  remove,
  clear,
} = submitLinksSlice.actions;
export default submitLinksSlice.reducer;
