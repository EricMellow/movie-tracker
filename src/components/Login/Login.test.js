import React from 'react';
import { Login, mapDispatchToProps } from './Login';
import { shallow } from 'enzyme';
import { createMemoryHistory } from "history";

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
      loginPassword: '',
      emailPasswordMatch: true,
      emailMatch: true
    };

    expect(wrapper.state()).toEqual(expected);
  });

  describe('onChangeHandler', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<Login />);
    });

    it('should set the correct property in state to the value the user inputs', () => {
      const expected = 'test@email.com';
      const mockEvent = {
        target: {
          name: 'signUpEmail',
          value: 'test@email.com'
        }
      };

      wrapper.find('input[name="signUpEmail"]').simulate('change', mockEvent);

      expect(wrapper.state('signUpEmail')).toEqual(expected);
    });
  });

  describe('signUpSubmitHandler', () => {
    let wrapper;
    let mockEvent;

    beforeEach(() => {
      
      const mockStoreUserId = jest.fn();
      const history = createMemoryHistory('/');
      wrapper = shallow(<Login
        storeUserId={mockStoreUserId}
        history={history}
      />);

      mockEvent = {
        preventDefault: jest.fn()
      };

      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve({
          data:
            { id: 5 }
        })
      }));

      wrapper.instance().getUsers = jest.fn(()=>([{}]));
      wrapper.instance().validateEmail = jest.fn();
    });

    it('should call fetch with correct arguments', async () => {
      wrapper.instance().getUsers = jest.fn().mockImplementation(() => ({
        emailMatch: false
      }));
      const mockState = {
        name: 'Namebo',
        signUpEmail: 'test@email.com',
        signUpPassword: 'YTho1!'
      };
      
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
      await wrapper.instance().signUpSubmitHandler(mockEvent);

      expect(window.fetch).toHaveBeenCalledWith(expectedUrl, expectedOptionsObject);
    });

    it('should call storeNewUser', async ()=>{
      wrapper.instance().storeNewUser = jest.fn();
      const result = wrapper.instance().storeNewUser;
      await wrapper.instance().signUpSubmitHandler(mockEvent);
      
      expect(result).toHaveBeenCalled();
    });

    it('sets emailMatch to false in state if no match is found', async ()=>{
      wrapper.instance().validateEmail = jest.fn().mockImplementation(()=>true);
      await wrapper.instance().signUpSubmitHandler(mockEvent);

      expect(wrapper.state('emailMatch')).toEqual(false);
    });

  });

  describe('loginSubmitHandler', () => {
    let wrapper;
    let mockEvent;

    beforeEach(() => {
      wrapper = shallow(<Login />);
      wrapper.instance().getUsers = jest.fn().mockImplementation(() => ({
        passwordEmailMatch: true
      }));
      wrapper.instance().validateLogin = jest.fn().mockImplementation(() => ({})); 
      mockEvent = {
        preventDefault: jest.fn()
      };
      wrapper.instance().loadExistingUser = jest.fn();
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve({
          id: 1,
          name: "Bread Butterson",
          password: "Toast1!",
          email: "test@gmail.com"
        })
      }));
    });

    it('should call fetch with correct arguments', async () => {
      const mockState = {
        loginEmail: 'test@email.com',
        loginPassword: 'YTho1!'
      };
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

      await wrapper.instance().loginSubmitHandler(mockEvent);

      expect(window.fetch).toHaveBeenCalledWith(expectedUrl, expectedOptionsObject);
    });

    it('should call loadExistingUser', async ()=>{
      await wrapper.instance().loginSubmitHandler(mockEvent);

      expect(wrapper.instance().loadExistingUser).toHaveBeenCalled();
    });

    it('should set the state of emailPasswordMatch to false if ther is no match', async ()=>{
      wrapper.instance().validateLogin = jest.fn().mockImplementation(() => (false)); 
      await wrapper.instance().loginSubmitHandler(mockEvent);
      
      expect(wrapper.state('emailPasswordMatch')).toEqual(false);
    });
  });

  describe('getUsers', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<Login />);
    });

    it('should call fetch with the correct argument', async () => {
      wrapper.instance().validateUser = jest.fn();
      const expectedUrl = 'http://localhost:3000/api/users/';


      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve({})
      }));
      await wrapper.instance().getUsers();

      expect(window.fetch).toHaveBeenCalledWith(expectedUrl);
    });

    it('returns the correct user data', async () => {
      const expected = {
        id: 2,
        name: 'Brett Bretterson',
        password: 'testpass123',
        email: 'test@test.com'
      };

      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve({ data: expected })
      }));
      const result = await wrapper.instance().getUsers();

      expect(result).toEqual(expected);
    });

  });

  describe('getUserId', () => {
    let wrapper;

    
    beforeEach(()=>{
      wrapper = shallow(<Login />);
      wrapper.setState({
        signUpPassword: 'password',
        signUpEmail: 'test@test.com'
      });
      window.fetch = jest.fn().mockImplementation(()=>Promise.resolve({json: ()=>Promise.resolve({data: {id: 2}})}))
    });

    it.only('should call fetch with the correct arguments', async () => {
      await wrapper.instance().getUserId()
      const expectedOptions = {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@test.com',
          password: 'password'
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const expectedURL = 'http://localhost:3000/api/users/';

      expect(window.fetch).toHaveBeenCalledWith(expectedURL, expectedOptions)
      
    });

    it('should behave...', () => {
      
    });
  });

  describe('validateUser', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<Login />);
    });

    it('should return an object with a key of emailMatch and value of true if the email is found', () => {
      const mockUserData = [{
        email: 'test@testmail.com',
        password: 'password'
      }];
      wrapper.setState({
        signUpEmail: 'test@testmail.com',
        signUpPassword: '12345'
      });
      const expected = {
        passwordEmailMatch: false,
        emailMatch: true
      };

      const result = wrapper.instance().validateUser(mockUserData);

      expect(result).toEqual(expected);
    });

    it('should return an object with a key of emailMatch and a value of true and a key of passwordEmail match and a value of true if the email and password match', () => {
      const mockUserData = [{
        email: 'test@testmail.com',
        password: 'password'
      }];
      wrapper.setState({
        signUpEmail: 'test@testmail.com',
        signUpPassword: 'password'
      });
      const expected = {
        passwordEmailMatch: true,
        emailMatch: true
      };

      const result = wrapper.instance().validateUser(mockUserData);

      expect(result).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', ()=> {

    it('should call dispatch with the correct params on storeUserId', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = {
        type: 'SET_USER_ID',
        userId: 6
      };
      
      mappedProps.storeUserId(6);
  
      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });
  });

});