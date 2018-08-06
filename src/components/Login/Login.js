import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./Login.css";
import TextBox from "../UI/TextBox/TextBox";
import Button from "../UI/Button/Button";
import * as actionCreators from "../../store/actions";

//FIXME:
//1. Proper Login Flow

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  emailChange = event => {
    this.setState({ email: event.target.value });
  };

  passwordChange = event => {
    this.setState({ password: event.target.value });
  };

  loginClick = () => {
    this.props.onLoginClick(this.state.email, this.state.password);
  };

  render() {
    return (
      <div className={classes.Login}>
        Login Page
        <TextBox type="text" name="email" changed={this.emailChange} />
        <TextBox type="text" name="password" changed={this.passwordChange} />
        <Button clicked={this.loginClick}>Login</Button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoginClick: (email, password) =>
      dispatch(actionCreators.login(email, password))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
