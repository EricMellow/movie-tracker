import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUserId } from "../../actions/index.js";

export class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      signUpEmail: '',
      signUpPassword: '',
      loginEmail: '',
      loginPassword: ''
    };

  }

  onChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  signUpSubmitHandler = async (event) => {
    event.preventDefault();
    const url = 'http://localhost:3000/api/users/new';

    const retrievedUserInfo = await this.getUsers();

    if (!retrievedUserInfo.emailMatch) {
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.signUpEmail,
          password: this.state.signUpPassword
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      );
      const newUserId = await this.getUserId();
      
      this.props.storeUserId(newUserId);

    } else {
      console.log('Password is in use');
    }
  }

  getUserId = async () => {
    const url = 'http://localhost:3000/api/users/';
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: this.state.signUpEmail,
        password: this.state.signUpPassword
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const userData = await response.json();
    const userId = userData.data.id;

    return userId;
  }

  loginSubmitHandler = async (event) => {
    event.preventDefault();

    const retrievedUserInfo = await this.getUsers();

    if (retrievedUserInfo.passwordEmailMatch) {
      const url = 'http://localhost:3000/api/users/';
      try {
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            email: this.state.loginEmail,
            password: this.state.loginPassword
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
        );
        const rawData = await response.json();
        const userData = rawData.data;
      } catch(error) {
        console.log(error);
      }
    } else {
      console.log('Email and Password do not match');
    }
  }

  getUsers = async () => {
    const url = 'http://localhost:3000/api/users/';
    const response = await fetch(url);

    const rawData = await response.json();
    const userData = rawData.data;

    return this.validateUser(userData);
  }

  validateUser = (userData) => {
    let emailMatch;
    let passwordEmailMatch;

    const validUser = userData.find(user => {
      return user.email === (this.state.signUpEmail || this.state.loginEmail);
    });
    
    if (validUser) {
      emailMatch = validUser.email ? true : false;
      passwordEmailMatch = (validUser.password === (this.state.signUpPassword || this.state.loginPassword)); 
    }

    return {passwordEmailMatch, emailMatch};
  }
  

  render() {
    return (

      <section className='signUpForms'>

        <article>
          <h2>Sign Up</h2>
          <form
            className='signUpForm'
            onSubmit={this.signUpSubmitHandler}
          >
          <h3>Full Name</h3>
            <input
              name='name'
              value={this.state.name}
              onChange={this.onChangeHandler}
            />
            <h3>Email</h3>
            <input
              name='signUpEmail'
              value={this.state.signUpEmail}
              onChange={this.onChangeHandler}
            />
            <h3>Password</h3>
            <input
              name='signUpPassword'
              value={this.state.signUpPassword}
              onChange={this.onChangeHandler}
            />
            <button>Sign Up</button>
          </form>
        </article>

        <article>
          <h2>Login</h2>
          <form
            className='loginForm'
            onSubmit={this.loginSubmitHandler}
          >
            <h3>Email</h3>
            <input
              name='loginEmail'
              value={this.state.loginEmail}
              onChange={this.onChangeHandler}
            />
            <h3>Password</h3>
            <input
              name='loginPassword'
              value={this.state.loginPassword}
              onChange={this.onChangeHandler}
            />
            <button>Login</button>
          </form>
        </article>

      </section>
    );
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    storeUserId: (userId) => {
      dispatch(setUserId(userId))
    }
  }
};

export default connect(null, mapDispatchToProps)(Login);