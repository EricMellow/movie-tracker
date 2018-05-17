import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      signUpEmail: '',
      signUpPassword: '',
      loginEmail: '',
      loginPassword: ''
    }
    
  }

  onChangeHandler=(event)=>{
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  render() {
    return (

      <section className='signUpForms'>

        <article>
          <h2>Sign Up</h2>
          <form className='signUpForm'>
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
          </form>
        </article>

        <article>
          <h2>Login</h2>
          <form className='loginForm'>
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
          </form>
        </article>

      </section>


    )
  }
}

