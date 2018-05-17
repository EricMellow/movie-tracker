import React from 'react';
import { Login } from './Login';
import { shallow } from 'enzyme';

describe('Login', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Login />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have the correct default state', () => {
    const expected = {
      name: '',
      signUpEmail: '',
      signUpPassword: '',
      loginEmail: '',
      loginPassword: ''
    };

    expect(wrapper.state()).toEqual(expected);
  });

  it('should set the correct property in state to the value the user inputs', () => {
    const expected = 'test@email.com'
    const mockEvent = { 
      target: { 
        name: 'signUpEmail', 
        value: 'test@email.com'
      } 
    }

    wrapper.find('input[name="signUpEmail"]').simulate('change', mockEvent)

    expect(wrapper.state('signUpEmail')).toEqual(expected);
  });

  it('should call fetch with correct arguments', async () => {
    const mockEvent = { 
      preventDefault: jest.fn()
    };
    const mockState = {
      name: 'Namebo',
      signUpEmail: 'test@email.com',
      signUpPassword: 'YTho1!'
    }
    const expectedUrl = 'http://localhost:3000/api/users/new';
    const expectedOptionsObject = {
      method: 'POST',
      body: JSON.stringify({
        name: 'Namebo',
        email: 'test@email.com',
        password: 'YTho1!'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    wrapper.setState(mockState);
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({}));
    wrapper.instance().signUpSubmitHandler(mockEvent);

    expect(window.fetch).toHaveBeenCalledWith(expectedUrl, expectedOptionsObject);
  });

  it('should call fetch with correct arguments', async () => {
    const mockEvent = { 
      preventDefault: jest.fn()
    };
    const mockState = {
      loginEmail: 'test@email.com',
      loginPassword: 'YTho1!'
    }
    const expectedUrl = 'http://localhost:3000/api/users/';
    const expectedOptionsObject = {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@email.com',
        password: 'YTho1!'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    wrapper.setState(mockState);
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => Promise.resolve({
        id: 1, 
        name: "Bread Butterson", 
        password: "Toast1!",
        email: "test@gmail.com"
      })
    }));

    wrapper.instance().loginSubmitHandler(mockEvent);

    expect(window.fetch).toHaveBeenCalledWith(expectedUrl, expectedOptionsObject);
  });

});