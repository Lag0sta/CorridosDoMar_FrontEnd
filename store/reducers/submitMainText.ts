import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Définir le type pour un élément du tableau 'value'
interface Item {
  type: string;
  text: string[];
}

interface SubmitMainTextState {
  value: Item[];
}

const initialState: SubmitMainTextState = {
  value: [] 
};

const submitMainTextSlice = createSlice({
  name: "submitMainText",
  initialState,
  reducers: {
    // Action 'add' avec un payload de type 'Item'
    add: (state, action : PayloadAction<Item>) => {
      state.value = [...state.value, action.payload]
    },

    // Action 'incrementIndex' avec un payload de type 'number'
    incrementIndex: (state, action: PayloadAction<number>) => {
        const index = action.payload;

        if(index < 0 || index >= state.value.length -1 ) return

        const newIndex = [...state.value];
        // fait changer l'index avec le suivant
        [newIndex[index], newIndex[index + 1]] = [newIndex[index + 1], newIndex[index]];
        state.value = newIndex;

    },

    // Action 'decrementIndex' avec un payload de type 'number'
    decrementIndex: (state, action: PayloadAction<number>) => {
        const index = action.payload;

        if (index <= 0) return state;
        const newIndex = [...state.value];
        // fait changer l'index avec le précédant
        [newIndex[index - 1], newIndex[index]] = [newIndex[index], newIndex[index - 1]];
        state.value = newIndex;
    },

        // Action 'edit' avec un payload ayant la structure { text: string, type: string }
        edit: (state, action: PayloadAction<{ text: string[]; type: string }>) => {
            console.log("editReducer", action.payload);  // Ajoute ceci pour inspecter le payload

            const { text, type } = action.payload;
            
            state.value = state.value.map((item) =>
              item.type === type ? { ...item, text } : item
            );
        },
    
    // Action 'remove' avec un payload de type 'number'
    remove: (state, action: PayloadAction<number>) => {
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
