import { Button } from "@mui/material";
import React from "react";

export default function JHButton({
   width,
   height,
   mt,
   text,
   fontSize,
   onClickFunc,
}) {
   return (
      <Button
         variant="contained"
         sx={{
            width: width,
            height: height,
            mt: mt,
            backgroundColor: "black.light",
            "&:hover": {
               backgroundColor: "black.main",
            },
            fontSize: fontSize,
            textTransform: "none",
         }}
         onClick={onClickFunc}
      >
         {text}
      </Button>
   );
}
