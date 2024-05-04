import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
   Box,
   FormControl,
   IconButton,
   InputAdornment,
   InputLabel,
   OutlinedInput,
   useMediaQuery,
} from "@mui/material";
import JHButton from "../components/JHButton";
import JHInput from "../components/JHInput";
import JHText from "../components/JHText";
import {
   lgFont,
   lgHeight,
   lgWidth,
   smFont,
   smHeight,
   smWidth,
   titleFont,
} from "../constants";

export default function Login() {
   const [showPassword, setShowPassword] = React.useState(false);

   const handleClickShowPassword = () => setShowPassword((show) => !show);

   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };

   const isSmall = useMediaQuery((theme) => theme.breakpoints.down("small"));

   return (
      <Box sx={{ p: 0, height: "100vh", backgroundColor: "silver.light" }}>
         <JHText
            text={"Job Hub"}
            size={titleFont}
            isBold={true}
            mt={0}
            align={"center"}
         />
         <Box
            sx={{
               height: "85vh",
               display: "flex",
               flexDirection: "column",
               justifyContent: "center",
               alignItems: "center",
            }}
         >
            <JHInput
               required={true}
               label="Email"
               width={isSmall ? smWidth : lgWidth}
               mt={0}
            />
            <FormControl
               sx={{ mt: 1, width: isSmall ? smWidth : lgWidth }}
               variant="outlined"
            >
               <InputLabel>Password</InputLabel>
               <OutlinedInput
                  required
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                     <InputAdornment position="end">
                        <IconButton
                           onClick={handleClickShowPassword}
                           onMouseDown={handleMouseDownPassword}
                           edge="end"
                        >
                           {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                     </InputAdornment>
                  }
                  label="Password"
               />
            </FormControl>
            <JHButton
               width={isSmall ? smWidth : lgWidth}
               height={isSmall ? smHeight : lgHeight}
               mt={1}
               text={"Sign in"}
               fontSize={isSmall ? smFont : lgFont}
            />
            <JHText text={"Or"} size={lgFont} isBold={true} mt={2} />
            <JHButton
               width={isSmall ? smWidth : lgWidth}
               height={isSmall ? smHeight : lgHeight}
               mt={1}
               text={"Create account"}
               fontSize={isSmall ? smFont : lgFont}
            />
         </Box>
      </Box>
   );
}
