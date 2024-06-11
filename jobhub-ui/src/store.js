import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./pages/Login/loginSlice";
import alertSlice from "./alertSlice";

export const store = configureStore({
   reducer: {
      login: loginSlice,
      alert: alertSlice,
   }
});