import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: ""
};

const authTokenSlice = createSlice({
  name: "authToken",
  initialState,
  reducers: {
    save: (state,  action) => {
      state.value = action.payload
    },
    
    clearToken: (state) => {
        state.value = ""
    },
  },
});

export const {save, clearToken } = authTokenSlice.actions;
export default authTokenSlice.reducer;
