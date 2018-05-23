import React from 'react';
import ReactDOM from 'react-dom';
import { Header, mapDispatchToProps } from '../Header/Header';
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
    let wrapper;
    let mockLogout;
    let history;
    let mockUserId;

    beforeEach(() => {
      mockLogout = jest.fn();
      history = createMemoryHistory('/');
      mockUserId = 3;

      wrapper = shallow(<Header userId={mockUserId} logout={mockLogout} history={history} />);
    });

    it('should call logout if user is signed in', () => {
      const result = wrapper.instance().props.logout;
      wrapper.instance().setRecentFeaturedMovie = jest.fn();
      wrapper.instance().handleLoginLogoutClick();

      expect(result).toHaveBeenCalled();
    });

    it('should call setRecentFeaturedMovie if user is signed in', () => {
      wrapper.instance().setRecentFeaturedMovie = jest.fn();
      wrapper.instance().handleLoginLogoutClick();

      expect(wrapper.instance().setRecentFeaturedMovie).toHaveBeenCalled();
    });

    it('should call setRecentFeaturedMovie if user is signed in', () => {
      wrapper.instance().setRecentFeaturedMovie = jest.fn();
      wrapper.instance().handleLoginLogoutClick();

      expect(wrapper.instance().setRecentFeaturedMovie).toHaveBeenCalled();
    });
  })

  describe('handleFavoritesClick', () => {
    let wrapper;
    let mockFavoriteMovies;
    let mockToggleRender;
    let mockEvent;

    beforeEach(() => {
      mockFavoriteMovies = [{title: 'Princess Bride'}]
      mockToggleRender = jest.fn();
      mockEvent = { preventDefault: () => {} };

      wrapper = shallow(<Header favoriteMovies={mockFavoriteMovies} toggleRender={mockToggleRender} />);

      wrapper.instance().setFavoriteFeaturedMovie = jest.fn();
    });

    it('should call setFavoriteFeaturedMovie when there are favorite movies', () => {
      wrapper.instance().handleFavoritesClick(mockEvent);

      const result = wrapper.instance().setFavoriteFeaturedMovie

      expect(result).toHaveBeenCalled();
    });

    it('should call toggleRender when there are favorite movies with the correct argument', () => {
      wrapper.instance().handleFavoritesClick();

      const result = mockToggleRender

      expect(result).toHaveBeenCalledWith(false);
    });

    it('should call togglError when there are no favorite movies with the correct argument', () => {
      mockFavoriteMovies = [];
      wrapper = shallow(<Header favoriteMovies={mockFavoriteMovies} toggleRender={mockToggleRender} />);
      wrapper.instance().toggleError = jest.fn();

      wrapper.instance().handleFavoritesClick(mockEvent);

      const result = wrapper.instance().toggleError

      expect(result).toHaveBeenCalledWith(mockEvent);
    });
  });

  describe('toggleError', () => {
    let wrapper;
    let mockEvent;

    beforeEach(() => {
      mockEvent = { preventDefault: jest.fn()};

      wrapper = shallow(<Header />);
    });

    it('should call preventDefault', () => {
      const result = mockEvent.preventDefault
      jest.useFakeTimers()
      wrapper.instance().toggleError(mockEvent);

      expect(result).toHaveBeenCalled();
    });

    it('should set state of favoritesError to true', () => {
      wrapper.instance().toggleError(mockEvent);

      expect(wrapper.state().favoritesError).toEqual(true)
    });

    it('should set state of favoritesError to false after 2 seconds', () => {
      wrapper.instance().toggleError(mockEvent);
      wrapper.update();  
      jest.runAllTimers();
       
      expect(wrapper.state().favoritesError).toEqual(false);
    }) 

  });

  describe('handleRecentsClick', () => {
    let wrapper;
    let mockToggleRender;

    beforeEach(() => {
      mockToggleRender = jest.fn();

      wrapper = shallow(<Header toggleRender={mockToggleRender} />);
    });

    it('should call setRecentFeaturedMovie', () => {
      wrapper.instance().setRecentFeaturedMovie = jest.fn();
      const result = wrapper.instance().setRecentFeaturedMovie

      wrapper.instance().handleRecentsClick();

      expect(result).toHaveBeenCalled();
    });

    it('should call toggleRender with the correct argument', () => {
      wrapper.instance().setRecentFeaturedMovie = jest.fn();
      const result = wrapper.instance().props.toggleRender

      wrapper.instance().handleRecentsClick();

      expect(result).toHaveBeenCalledWith(true);
    });
  });

  describe('handleLogoClick', () => {
    let wrapper;
    let history;

    beforeEach(() => {
      history = createMemoryHistory('/');

      wrapper = shallow(<Header history={history} />);
    });

    it('should call handleRecentsClick', () => {
      wrapper.instance().handleRecentsClick = jest.fn();
      const result = wrapper.instance().handleRecentsClick

      wrapper.instance().handleLogoClick();

      expect(result).toHaveBeenCalled();
    });
  });

  describe('setFavoriteFeaturedMovie', () => {
    let wrapper;
    let mockSetFeaturedMovie;
    let mockFavoriteMovies;

    beforeEach(() => {
      mockSetFeaturedMovie = jest.fn();
      mockFavoriteMovies = [{title: 'Sandlot', movie_id: 29386}];

      wrapper = shallow(<Header favoriteMovies={mockFavoriteMovies} setFeaturedMovie={mockSetFeaturedMovie} />);
    });

    it('should call setFeaturedMovie with correct argument', () => {
      const result = wrapper.instance().props.setFeaturedMovie;
      const expected = 29386;

      wrapper.instance().setFavoriteFeaturedMovie();

      expect(result).toHaveBeenCalledWith(expected);
    });
  });
  
  describe('setRecentFeaturedMovie', () => {
    let wrapper;
    let mockSetFeaturedMovie;
    let mockFavoriteMovies;

    beforeEach(() => {
      mockSetFeaturedMovie = jest.fn();
      mockFavoriteMovies = [{title: 'Sandlot', movie_id: 29165}];

      wrapper = shallow(<Header recentMovies={mockFavoriteMovies} setFeaturedMovie={mockSetFeaturedMovie} />);
    });

    it('should call setFeaturedMovie with correct argument', () => {
      const result = wrapper.instance().props.setFeaturedMovie;
      const expected = 29165;

      wrapper.instance().setRecentFeaturedMovie();

      expect(result).toHaveBeenCalledWith(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch with the correct params on toggleRender', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = {
        type: 'TOGGLE_RENDER_RECENT',
        toggle: false
      };
      
      mappedProps.toggleRender(false);
  
      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });

    it('should call dispatch on Logout', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = {
        type: 'LOGOUT'
      };
      
      mappedProps.logout();
  
      expect(mockDispatch).toHaveBeenCalled();
    });

    it('should call dispatch on setFeaturedMovie', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = {
        type: 'SET_FEATURED_MOVIE'
      };
      
      mappedProps.setFeaturedMovie();
  
      expect(mockDispatch).toHaveBeenCalled();
    });
  });
});
  