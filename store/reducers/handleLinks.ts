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

const handleLinksSlice = createSlice({
  name: "handleSubmitLinks",
  initialState,
  reducers: {

    // Initialisation du Reducer
    initLinks: (state, action) => {
      state.value = action.payload
    },

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

export const {initLinks, add, remove, clear} = handleLinksSlice.actions;
export default handleLinksSlice.reducer;
