import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  value: {
    token: "",
    email: "",
    avatar: "",
    pseudo: "",
    submits: []
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.email = action.payload.email;
      state.value.pseudo = action.payload.pseudo;
      state.value.avatar = action.payload.avatar;
    },
    addToken: (state, action) => {
      state.value.token = action.payload;
    },
   
    logout: (state) => {
      state.value.token = "";
      state.value.email = "";
      state.value.pseudo = "";
      state.value.avatar = ""; 
    },
  },
});

export const {
  login,
  addToken,
  logout,
} = userSlice.actions;
export default userSlice.reducer;
