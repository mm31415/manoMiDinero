import React from "react";
import SessionErrorsContainer from "../errors/session_errors_container";
import { Redirect } from "react-router-dom";

class SignUpForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = props.user;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateField (field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  handleSubmit (e) {
    e.preventDefault();
    if (this.props.formType === "signup") {
      this.props.signup(Object.assign({}, this.state)).then(
        () => {
          // this.setState({ name: '', email: '', password: '' });
          // this.props.history.push("/");
        },
        () => this.setState({ password: '' })
      );
    } else {
      this.props.login(Object.assign({}, this.state)).then(
        () => {
          // this.setState({ email: '', password: ''});
          // this.props.history.push("/");
        },
        () => this.setState({ password: '' })
      );
    }
  }

  render () {

    if (this.props.logged_in) {
      return <Redirect to="/" />;
    }
    return (
      <div className="session-form">
        <img id="logo" src={window.staticImages.logo} />
        <SessionErrorsContainer />
        <form onSubmit={this.handleSubmit}>
          { (this.props.formType === "signup") ?
            <h3>Introduce Yourself</h3> : <h3>Welcome to SplitWiseClone</h3> }
          {
            (this.props.formType === "signup") &&
            (
            <div>
              <h2>Hi there! My name is:</h2>
              <input type="text" onChange={this.updateField('name')} value={this.state.name} />
            </div>
            )
          }
          { (this.props.formType === "signup") ?
            <h2>Here's my email address:</h2> : <h2>Email address</h2> }
          <input type="text" onChange={this.updateField('email')} value={this.state.email} />
            { (this.props.formType === "signup") ?
              <h2>And here's my password:</h2> : <h2>Password</h2> }
          <input type="password" onChange={this.updateField('password')} value={this.state.password} />
          { (this.props.formType === "signup") ?
            <button id="submit-btn">Sign me up!</button> : <button id="submit-btn">Login</button> }
        </form>
      </div>
    );
  }

}

export default SignUpForm;
