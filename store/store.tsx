import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { contactReducer } from './ContactSlice';



const store= configureStore({
  reducer: {
    contact: contactReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type ContactDispatch = typeof store.dispatch
export const useContactDispatch = () => useDispatch<ContactDispatch>()
export default  store;
