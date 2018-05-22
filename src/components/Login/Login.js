import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUserId, addStoredFavorites } from "../../actions/index.js";
import './Login.css';


export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      signUpEmail: '',
      signUpPassword: '',
      loginEmail: '',
      loginPassword: '',
      emailPasswordMatch: true,
      emailMatch: true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userId) {
      this.props.history.push('/');
    }
  }

  onChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  signUpSubmitHandler = async (event) => {
    event.preventDefault();
    const users = await this.getUsers();
    const emailMatch = this.validateEmail(users);
    const url = 'http://localhost:3000/api/users/new';

    if (!emailMatch) {
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
      
      this.storeNewUser();
    } else {
      
      this.setState({
        emailMatch: false
      });
    }
    
  }

  loginSubmitHandler = async (event) => {
    event.preventDefault();

    const users = await this.getUsers();
    const validUser = await this.validateLogin(users);

    if (validUser) {
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
        
        this.loadExistingUser();
      } catch (error) {
        console.log(error);
      }
    } else {
      this.setState({
        emailPasswordMatch: false
      });
    }
  }

  getUsers = async () => {
    const url = 'http://localhost:3000/api/users/';
    const response = await fetch(url);
    const rawData = await response.json();
    const userData = rawData.data;

    return userData
  }


  getUserId = async () => {
    const email = this.state.signUpEmail ? this.state.signUpEmail : this.state.loginEmail;
    const password = this.state.signUpPassword ? this.state.signUpPassword : this.state.loginPassword;
    const url = 'http://localhost:3000/api/users/';

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const userData = await response.json();
    const userId = userData.data.id;

    return userId;
  }

  storeNewUser = async () => {
    const newUserId = await this.getUserId();
    this.props.storeUserId(newUserId);
  }

  loadExistingUser = async () => {
    const userId = await this.getUserId();
    this.props.storeUserId(userId);
    this.getFavorites(userId);
  }

  getFavorites = async (userId) => {
    const url = `http://localhost:3000/api/users/${userId}/favorites`;
    const response = await fetch(url);
    const favoritesData = await response.json();
    const favoriteMovies = favoritesData.data;

    this.props.addFavorites(favoriteMovies);
  }

  validateEmail = (users) => {
    return users.find(user => user.email === (this.state.signUpEmail || this.state.loginEmail));
  }

  validatePassword = (user) => {
    return user.password === (this.state.signUpPassword || this.state.loginPassword);
  }

  validateLogin = (users) => {
    let validateUser;
    const foundUser = this.validateEmail(users);

    if (foundUser) {
      validateUser = this.validatePassword(foundUser);
    }

    return validateUser;
  }

  render() {
    return (

      <section className='signUpForms'>

        <article className='signUp'>
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
            
              {this.state.emailMatch ? '' : <p className="loginError">Email has already been used</p>}
            <h3>Password</h3>
            <input
              name='signUpPassword'
              value={this.state.signUpPassword}
              onChange={this.onChangeHandler}
            />
            <button>Sign Up</button>
          </form>
        </article>
        <div className="formDivider"><div></div><span>OR</span><div></div></div>
        <article className='login'>
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
              {this.state.emailPasswordMatch ? '' : <p className="loginError">Email and Password do not match</p>}
            <button>Login</button>
          </form>
        </article>

      </section>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  storeUserId: (userId) => dispatch(setUserId(userId)),
  addFavorites: (favoriteMovies) => dispatch(addStoredFavorites(favoriteMovies))
});

export const mapStateToProps = (state) => ({
  userId: state.userId
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);