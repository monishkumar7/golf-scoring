import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./Login.css";
import FormInput from "../UI/FormInput/FormInput";
import Button from "../UI/Button/Button";
import * as actionCreators from "../../store/actions";

class Login extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Enter your Allcal Email Address"
        },
        validation: {
          required: true
        },
        value: "",
        valid: false,
        touched: false
      },
      password: {
        elementType: "password",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        validation: {
          required: true,
          minLength: 6
        },
        value: "",
        valid: false,
        touched: false
      }
    }
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        touched: true,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        )
      }
    };
    this.setState({ controls: updatedControls });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onLoginClick(
      this.state.controls.email.value,
      this.state.controls.password.value
    );
  };

  render() {
    const formElements = [];
    for (let key in this.state.controls) {
      formElements.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = formElements.map(formElement => (
      <FormInput
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={event => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    let loginMessage = "";
    if (this.props.loginError) {
      loginMessage =
        "Login Failed. The username / password combination is invalid.";
    }

    return (
      <div className={classes.Login}>
        <h4>RB Golf Scoring</h4>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button>SUBMIT</Button>
          <br />
          {loginMessage}
          <br />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginError: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoginClick: (email, password) =>
      dispatch(actionCreators.webLogin(email, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
