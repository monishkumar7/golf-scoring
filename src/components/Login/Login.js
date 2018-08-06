import React, { Component } from "react";

import classes from "./Login.css";
import TextBox from "../UI/TextBox/TextBox";
import Button from "../UI/Button/Button";

class Login extends Component {
  state = {
    email: "e2b4db8eefc5b1601f24689a311054c32e64ffa9", //LoginID
    password: "5b64aa81c3f16f353d771058" //EventID
  };

  login = () => {
    console.log(this.props);
    this.props.history.push(
      "/scores?loginToken=" +
        this.state.email +
        "&eventId=" +
        this.state.password
    );
  };

  render() {
    return (
      <div className={classes.Login}>
        Login Page
        <TextBox type="text" name="email" readOnly value={this.state.email} />
        <TextBox
          type="text"
          name="password"
          readOnly
          value={this.state.password}
        />
        <Button clicked={this.login}>Login</Button>
      </div>
    );
  }
}

export default Login;
