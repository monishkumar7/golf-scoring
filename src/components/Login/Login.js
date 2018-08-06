import React from "react";

import classes from "./Login.css";
import TextBox from "../UI/TextBox/TextBox";

const login = props => {
  return (
    <div className={classes.Login}>
      Login Page
      <TextBox type="text" name="email" />
      <TextBox type="text" name="password" />
    </div>
  );
};

export default login;
