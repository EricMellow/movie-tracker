import React from 'react';
import { Login, mapDispatchToProps, mapStateToProps } from './Login';
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

    it('should set state of emailPasswordMatch to false when fetch status is not ok', async ()=>{
      window.fetch = jest.fn().mockImplementation(() => Promise.reject(new Error('test error')));

      await wrapper.instance().loginSubmitHandler(mockEvent);

      expect(wrapper.state().emailPasswordMatch).toEqual(false);    
    });

    it('should set state of emailPasswordMatch to true when the user is not valid', async () => {
      wrapper.instance().validateLogin = jest.fn().mockImplementation(() => (null)); 

      await wrapper.instance().loginSubmitHandler(mockEvent);

      expect(wrapper.state().emailPasswordMatch).toEqual(false);    
    })
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
      window.fetch = jest.fn().mockImplementation(()=>Promise.resolve({json: ()=>Promise.resolve({data: {id: 2}})}));
    });

    it('should call fetch with the correct arguments', async () => {
      await wrapper.instance().getUserId();
      const expectedOptions = {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@test.com',
          password: 'password'
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const expectedURL = 'http://localhost:3000/api/users/';

      expect(window.fetch).toHaveBeenCalledWith(expectedURL, expectedOptions);
      
    });

    it('should return the correct user id', async () => {
      const result = await wrapper.instance().getUserId();

      expect(result).toEqual(2);
    });
  });

  describe('storeNewUser', () => {
    it('should call storeUserId from props with the correct argument', async () => {
      const mockStoreUserId = jest.fn();
      const wrapper = shallow(<Login storeUserId={mockStoreUserId}/>);
      wrapper.instance().getUserId = jest.fn().mockImplementation(()=>3);
      await wrapper.instance().storeNewUser();
      const result = wrapper.instance().props.storeUserId;

      expect(result).toHaveBeenCalledWith(3);
    });
  });

  describe('loadExistingUser', () => {
    let mockStoreUserId;
    let wrapper;
    
    beforeEach(() => {
      mockStoreUserId = jest.fn();
      wrapper = shallow(<Login storeUserId={mockStoreUserId} />);

      wrapper.instance().getUserId = jest.fn().mockImplementation(() => 3);
      wrapper.instance().getFavorites = jest.fn();
    });

    it('should call storeUserId from props with the correct argument', async () => {
      await wrapper.instance().loadExistingUser();
      const result = wrapper.instance().props.storeUserId;

      expect(result).toHaveBeenCalledWith(3);
    });

    it('should call getFavorites with the correct argument', async () => {
      await wrapper.instance().loadExistingUser();
      const result = wrapper.instance().getFavorites;

      expect(result).toHaveBeenCalledWith(3);
    });
  });

  describe('getFavorites', () => {
    let wrapper;
    let mockUserId;
    let mockAddFavorites;

    beforeEach(() => {
      mockAddFavorites = jest.fn();
      wrapper = shallow(<Login addFavorites={mockAddFavorites}/>);
      mockUserId = 3;

      window.fetch = jest.fn().mockImplementation(()=>Promise.resolve({
        json: ()=>Promise.resolve({
          data: [{title: "Happy Days"}]
        })
      }));
    });

    it('should call fetch with the correct argument', async () => {
      // setup
      const expected = `http://localhost:3000/api/users/3/favorites`;
      // execution
      await wrapper.instance().getFavorites(mockUserId);
      // expectation
      const result = window.fetch;
      expect(result).toHaveBeenCalledWith(expected);
    });
    it('should call addFavorites from props with the correct argument', async () => {
      
      await wrapper.instance().getFavorites(mockUserId);
      const result = wrapper.instance().props.addFavorites;
      expect(result).toHaveBeenCalledWith([{ title: "Happy Days" }]);
    });
  });

  describe('validateEmail', () => {
    it('should return a user is she/he has a signUp or login email', () => {
      //setup
      const wrapper = shallow(<Login />);
      const mockUsers = [
        {email: 'test@test.com'},
        {email: 'poop@poop.com'}
      ];

      wrapper.setState({ signUpEmail: 'test@test.com'});
      const result = wrapper.instance().validateEmail(mockUsers);
      const expected = { email: 'test@test.com' };
      expect(result).toEqual(expected);
    });
  });

  describe('validatePassword', () => {
    it('should return a user if her/his password exists in the store', () => {
      const wrapper = shallow(<Login />);
      const mockUser = { password: 'password' };

      wrapper.setState({signUpPassword: 'password'});
      const result = wrapper.instance().validatePassword(mockUser);
      const expected = true;
      expect(result).toEqual(expected);
    }); 
  });

  describe('validateLogin', () => {
    it('should return true if the foundUser has an email and password that match an existing user', () => {
      //setup
      const wrapper = shallow(<Login />);
      const mockUsers = [
        { 
          email: 'test@test.com',
          password: 'password'
        },
        { 
          email: 'poop@poop.com',
          password: 'poop'
        }
      ];

      wrapper.setState({
        signUpEmail: 'test@test.com',
        signUpPassword: 'password'
      });

      //execution
      const result = wrapper.instance().validateLogin(mockUsers);
      //expectation
      const expected = true;
      
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

    it('should call dispatch with the correct params on addFavorites', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = {
        type: 'ADD_STORED_FAVORITES',
        favoriteMovies: [{title: 'Boondock Saints'}]
      };
      
      mappedProps.addFavorites([{title: 'Boondock Saints'}]);
  
      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });
  });

  describe('mapStateToProps', () => {
    it('should map userId to props', () => {
      const state = {
        userId: 3,
        favoriteMovies: [{title: 'Happy Days'}]
      };
      const expected = {
        userId: 3
      };
      const mappedProps = mapStateToProps(state);
      
      expect(mappedProps).toEqual(expected);
    }); 
  });
});