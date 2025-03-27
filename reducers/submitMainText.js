import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: []
};

const submitMainTextSlice = createSlice({
  name: "submitMainText",
  initialState,
  reducers: {
    add: (state, action) => {
      state.value = [...state.value, action.payload]
    },

    incrementIndex: (state, action) => {
        const index = action.payload;

        if(index < 0 || index >= state.value.length -1 ) return

        const newIndex = [...state.value];
        // fait changer l'index avec le suivant
        [newIndex[index], newIndex[index + 1]] = [newIndex[index + 1], newIndex[index]];
        state.value = newIndex;

    },

    decrementIndex: (state, action) => {
        const index = action.payload;

        if (index <= 0) return state;
        const newIndex = [...state.value];
        // fait changer l'index avec le précédant
        [newIndex[index - 1], newIndex[index]] = [newIndex[index], newIndex[index - 1]];
        state.value = newIndex;
    },

        edit: (state, action) => {
            console.log("editReducer", action.payload);  // Ajoute ceci pour inspecter le payload

            const { text, type } = action.payload;
            
            state.value = state.value.map((item) =>
              item.type === type ? { ...item, text } : item
            );
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
  incrementIndex,
  decrementIndex,
  edit,
  remove,
  clear,
  
} = submitMainTextSlice.actions;
export default submitMainTextSlice.reducer;
