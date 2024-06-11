import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../alertSlice";

export default function JHAlert() {
   const dispatch = useDispatch();
   const alert = useSelector((store) => store.alert);
   const { open, severity, message } = alert;

   function closeAlert() {
      dispatch(setAlert("", "", false));
   }

   return (
      <Snackbar
         open={open}
         autoHideDuration={4000}
         onClose={closeAlert}
         anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
         <Alert onClose={closeAlert} severity={severity}>
            {message}
         </Alert>
      </Snackbar>
   );
}
