import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface mainText {
  text: string[];
  type: string;
}

interface link {
  link: string;
  type: string;
}

interface EditSubmitState {
  value: {
    type: string;
    title: string;
    secondaryTitle: string;
    secondaryType: string;
    mainText: mainText[];
    links: link[];
  };
}

const initialState: EditSubmitState = {
  value: {
    type: "",
    title: "",
    secondaryTitle: "",
    secondaryType: "",
    mainText: [],
    links: [],
  }
};

const editSubmitSlice = createSlice({
  name: "editSubmit",
  initialState,
  reducers: {

    initialise: (state, action) => {
      state.value = action.payload
    },

    editType: (state, action) => {
      state.value.type = action.payload
    },

    editTitle: (state, action) => {
      state.value.title = action.payload
    },

    editSecondaryTitle: (state, action) => {
      state.value.secondaryTitle = action.payload
    },

    editSecondaryType: (state, action) => {
      state.value.secondaryType = action.payload
    },

    
  },
});

export const { initialise, editType, editTitle, editSecondaryTitle, editSecondaryType } = editSubmitSlice.actions;
export default editSubmitSlice.reducer;  