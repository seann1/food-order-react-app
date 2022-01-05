import React from "react";
import { Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import classes from "./Input.module.css";
const theme = createTheme();
theme.typography.body1 = {
  fontSize: ".2rem",
  color: "black",
  "@media (min-width:600px)": {
    fontSize: ".4rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: ".6rem",
  },
};
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>
        <Typography variant="body1">{props.label}</Typography>
      </label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
