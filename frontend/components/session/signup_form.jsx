import React from "react";

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
    this.props.signup(Object.assign({}, this.state));
  }


  render () {
    return (
      <div>
        <h2>Hey Guy, you're at the sign up form</h2>
        <h3>Introduce Yourself</h3>
        <form onSubmit={this.handleSubmit}>
          <h3>Hi there! My name is:</h3>
          <input type="text" onChange={this.updateField('name')} value={this.state.name} />
          <h3>Here's my email address:</h3>
          <input type="text" onChange={this.updateField('email')} value={this.state.email} />
          <h3>And here's my password:</h3>
          <input type="password" onChange={this.updateField('password')} value={this.state.password} />
          <button>Sign me up!</button>
        </form>
      </div>
    );
  }

}

export default SignUpForm;
