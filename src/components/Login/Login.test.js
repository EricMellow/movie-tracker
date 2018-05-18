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

  describe('onChangeHandler', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<Login />);
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
  });

  describe('signUpSubmitHandler', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<Login />);
    });

    it('should call fetch with correct arguments', async () => {
      wrapper.instance().getUsers = jest.fn().mockImplementation( () => ({
        email: ''
      }))
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
      await wrapper.instance().signUpSubmitHandler(mockEvent);
  
      expect(window.fetch).toHaveBeenCalledWith(expectedUrl, expectedOptionsObject);
    });
    
  });

  describe('loginSubmitHandler', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<Login />);
    });

    it('should call fetch with correct arguments', async () => {
      wrapper.instance().getUsers = jest.fn().mockImplementation(() => ({
        validateUser: true
      }))
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
  
      await wrapper.instance().loginSubmitHandler(mockEvent);
  
      expect(window.fetch).toHaveBeenCalledWith(expectedUrl, expectedOptionsObject);
    });
  });

  describe('getUsers', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<Login />);
    });

    it('should call fetch with the correct argument', async () => {
      wrapper.instance().validateUser = jest.fn()
      const expectedUrl = 'http://localhost:3000/api/users/';

     
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve({})
      }));
      await wrapper.instance().getUsers();

      expect(window.fetch).toHaveBeenCalledWith(expectedUrl);
    });
    
    it('should call validateUser with the correct argument', async () => {
      wrapper.instance().validateUser = jest.fn();
      const expected = {
        id: 2,
        name: 'Brett Bretterson',
        password: 'testpass123',
        email: 'test@test.com'
      };


      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve({data: expected})
      }));
      await wrapper.instance().getUsers();

      expect(wrapper.instance().validateUser).toHaveBeenCalledWith(expected);
    });
    
  });
  
  describe('validateUser', () => {
    let wrapper;
    
    beforeEach(() => {
      wrapper = shallow(<Login />);
    });
  });
});