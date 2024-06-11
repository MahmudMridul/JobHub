import { TextField } from "@mui/material";
import React from "react";

export default function JHInput({
   required,
   error,
   label,
   styles,
   value,
   onChangeFunc,
}) {
   return (
      <TextField
         required={required}
         error={error}
         label={label}
         sx={styles}
         value={value}
         onChange={onChangeFunc}
      />
   );
}
