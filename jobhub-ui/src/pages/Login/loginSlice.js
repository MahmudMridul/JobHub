import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   email: "",
   invalidEmail: false,
   emailHelperText: "",
   password: "",
   invalidPass: false,
   passHelperText: "",
};

export const loginSlice = createSlice({
   name: 'login',
   initialState,
   reducers: {
      setLoginState: {
         prepare(name, value) {
            return {
               payload: { name, value }
            };
         },
         reducer(state, action) {
            const { name, value } = action.payload;
            state[name] = value;
         }
      },
   },
});

export const { setLoginState } = loginSlice.actions;
export default loginSlice.reducer;