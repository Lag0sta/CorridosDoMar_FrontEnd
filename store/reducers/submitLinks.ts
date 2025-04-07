import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Link {
  type: string;
  link: string;
}

interface SubmitLinksState {
  value: Link[]; // Typage de "value" comme un tableau de Link
}

const initialState : SubmitLinksState = {
  value: []
};

const submitLinksSlice = createSlice({
  name: "submitLinks",
  initialState,
  reducers: {
    add: (state,  action: PayloadAction<Link>) => {
      state.value = [...state.value, action.payload]
    },
    remove: (state,  action: PayloadAction<number>) => {
        state.value.splice(action.payload, 1);
    },
   
    clear: (state) => {
        state.value = []
    },
  },
});

export const {add, remove, clear} = submitLinksSlice.actions;
export default submitLinksSlice.reducer;
