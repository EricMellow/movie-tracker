import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: ''
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
              name='email'
              value={this.state.email}
              onChange={this.onChangeHandler}
            />
            <h3>Password</h3>
            <input
              name='password'
              value={this.state.password}
              onChange={this.onChangeHandler}
            />
          </form>
        </article>

        <article>
          <h2>Login</h2>
          <form className='loginForm'></form>
        </article>

      </section>


    )
  }
}

