import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   open: false,
   severity: "",
   message: "",
};

export const alertSlice = createSlice({
   name: 'alert',
   initialState,
   reducers: {
      setAlert: {
         prepare(severity, message, open) {
            return {
               payload: { severity, message, open }
            };
         },
         reducer(state, action) {
            const { severity, message, open } = action.payload;
            state.severity = severity;
            state.message = message;
            state.open = open;
         }
      },
   },
});

export const { setAlert } = alertSlice.actions;
export default alertSlice.reducer;