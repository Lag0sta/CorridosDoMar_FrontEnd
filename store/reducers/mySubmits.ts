import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface mySubmits {
    value: string[];
};

const initialState: mySubmits = {
  value: []
};

const mySubmitsSlice = createSlice({
  name: "mySubmits",
  initialState,
  reducers: {
    addToList: (state,  action: PayloadAction<string>) => {
        state.value = [...state.value, action.payload]
    },
  },
});

export const { addToList } = mySubmitsSlice.actions;
export default mySubmitsSlice.reducer;  