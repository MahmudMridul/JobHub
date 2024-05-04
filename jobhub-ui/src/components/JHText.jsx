import { Typography } from "@mui/material";
import React from "react";

export default function JHText({ text, size, isBold, mt, align }) {
   return (
      <Typography
         sx={{
            mt: mt,
            fontSize: size,
            fontWeight: isBold ? "bold" : 400,
            textAlign: align,
         }}
      >
         {text}
      </Typography>
   );
}
