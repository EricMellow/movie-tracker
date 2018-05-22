import React from 'react';
import ReactDOM from 'react-dom';
import { Header } from '../Header/Header';
import { shallow } from 'enzyme';
import { createMemoryHistory } from 'history'

describe('Header', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Header />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have default state', ()=> {
    const expected = {
      favoritesError: false
    }

    expect(wrapper.state()).toEqual(expected);
  })

  describe('handleLoginLogoutClick', () => {
    beforeEach(() => {
      const mockLogout = jest.fn();
      const history = createMemoryHistory('/')
      const mockUserId = 3;

      wrapper = shallow(<Header userId={mockUserId} logout={mockLogout} history={history} />);
    });

    it('should call logout if user is signed in', () => {
      const result = wrapper.instance().props.logout;
      wrapper.instance().setRecentFeaturedMovie = jest.fn();
      wrapper.instance().handleLoginLogoutClick();

      expect(result).toHaveBeenCalled();
    });

    it('should call setRecentFeaturedMovie if user is signed in', () => {
      // const result = wrapper.instance().setRecentFeaturedMovie;
      wrapper.instance().setRecentFeaturedMovie = jest.fn();
      wrapper.instance().handleLoginLogoutClick();

      expect(wrapper.instance().setRecentFeaturedMovie).toHaveBeenCalled();
    });
  });

});
  