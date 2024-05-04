import { TextField } from "@mui/material";
import React from "react";

export default function JHInput({ required, label, width, mt, onChangeFunc }) {
   return (
      <TextField
         required={required}
         label={label}
         sx={{ width: width, mt: mt }}
         onChange={onChangeFunc}
      />
   );
}
