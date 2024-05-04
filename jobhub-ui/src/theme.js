import { createTheme } from "@mui/material";

export const theme = createTheme({
   breakpoints: {
      values: {
         small: 770,
         pc: 1024,
      }
   },
   typography: {
      fontFamily: "Nunito, sans-serif",
   },
   palette: {
      black: {
         main: "#000000",
         light: "#353839",
      },
      silver: {
         light: "#f5f5f5"
      }
   },
});