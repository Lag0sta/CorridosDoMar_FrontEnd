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

  const initialState: EditSubmitState =  {
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
    }
   
  },
});

export const { initialise } = editSubmitSlice.actions;
export default editSubmitSlice.reducer;  