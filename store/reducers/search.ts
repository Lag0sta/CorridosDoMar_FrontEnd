import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface Link {
  link: string;
  type: string;
}

interface MainText {
  text: string[];
  type: string;
}

interface SubmitData {
  type: string;
  title: string;
  secondaryTitle: string;
  secondaryType: string;
  mainText: [MainText];
  links: [Link]
  createdBy: string; // ou ObjectId si vous utilisez mongoose
  creationDate: Date;
  latestUpdate: Date;
  authorised: boolean;
}


const initialState = {
  value: [] as SubmitData[],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    fetchData: (state, action: PayloadAction<SubmitData[]>) => {
      //enregistre les data envoyé et les range dans l'ordre alphabetique
      state.value = action.payload.sort((a,b) => a.title.localeCompare(b.title));
    },
 
  },
});

export const {
  fetchData,
} = searchSlice.actions;
export default searchSlice.reducer;
