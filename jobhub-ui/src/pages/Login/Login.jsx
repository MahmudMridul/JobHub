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
import JHButton from "../../components/JHButton";
import JHInput from "../../components/JHInput";
import JHText from "../../components/JHText";
import {
   lgFont,
   lgHeight,
   lgWidth,
   smFont,
   smHeight,
   smWidth,
   titleFont,
} from "../../constants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { validEmail, validPassword } from "./loginUtils";
import { setLoginState } from "./loginSlice";
import { setAlert } from "../../alertSlice";
import JHAlert from "../../components/JHAlert";

export default function Login() {
   const navigate = useNavigate();
   const [showPassword, setShowPassword] = React.useState(false);
   const isSmall = useMediaQuery((theme) => theme.breakpoints.down("small"));

   const inputStyles = {
      width: isSmall ? smWidth : lgWidth,
      mt: 0,
   };

   const handleClickShowPassword = () => setShowPassword((show) => !show);

   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };

   const dispatch = useDispatch();
   const login = useSelector((store) => store.login);
   const { email, password, invalidEmail, invalidPass } = login;

   function setEmail(event) {
      const val = event.target.value;
      if (!validEmail(val)) {
         dispatch(setLoginState("invalidEmail", true));
      } else {
         dispatch(setLoginState("invalidEmail", false));
      }
      dispatch(setLoginState("email", val));
   }

   function setPassword(event) {
      const val = event.target.value;
      if (!validPassword(val)) {
         dispatch(setLoginState("invalidPass", true));
      } else {
         dispatch(setLoginState("invalidPass", false));
      }
      dispatch(setLoginState("password", val));
   }

   function signIn() {
      if (!validEmail(email)) {
         dispatch(setAlert("error", "Email is not valid", true));
         return;
      }
      if (!validPassword(password)) {
         dispatch(setAlert("error", "Password is not valid", true));
         return;
      }
      navigate("/home");
      dispatch(setAlert("success", "Login successful", true));
   }

   return (
      <Box sx={{ p: 0, height: "100vh", backgroundColor: "silver.light" }}>
         <JHAlert />
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
               error={invalidEmail}
               label="Email"
               styles={inputStyles}
               value={email}
               onChangeFunc={setEmail}
            />
            <FormControl
               sx={{ mt: 1, width: isSmall ? smWidth : lgWidth }}
               variant="outlined"
            >
               <InputLabel>Password</InputLabel>
               <OutlinedInput
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                  error={invalidPass}
                  onChange={setPassword}
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
               onClickFunc={signIn}
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
