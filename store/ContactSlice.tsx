import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Person } from '../types';

type Contact = {
    searchString: string,
    contacts: Array<Person>,
    currentId: number,
}

const initialState: Contact = {
    searchString: "",
    contacts: [],
    currentId: 0,
}
const db = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        setString: (state, action: PayloadAction<string>) => {
            return { ...state, searchString: action.payload }

        },
        setContacts: (state, action: PayloadAction<Array<Person>>) => {
            return { ...state, contacts: action.payload }
        },
        setCurrentId: (state, action: PayloadAction<number>) => {
            return { ...state, currentId: action.payload }
        },
    },
});

export const contactReducer = db.reducer;
export const { setString, setContacts, setCurrentId } = db.actions;
export const selectSearchString = (state: RootState) => {
    return state.contact.searchString;
};
export const selectContacts = (state: RootState) => {
    return state.contact.contacts;
};
export const selectCurrentId = (state: RootState) => {
    return state.contact.currentId;
};

// export const selectPerson = (id: number) => {
//     return (state: RootState): Person => {
//         for (const p of state.contact.contacts) {
//             if (p.id == id) {
//                 return p;
//             }
//         }
//         return {} as Person;
//     }
// };
export const selectCurrentPerson = (state: RootState) => {
    for (const p of state.contact.contacts) {
        if (p.id == state.contact.currentId) {
            return p;
        }
    }
    return {} as Person;
}
