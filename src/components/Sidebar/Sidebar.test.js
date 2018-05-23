import React from 'react';
import { Sidebar, mapStateToProps } from "./Sidebar";
import { shallow } from 'enzyme';

describe('Card', () => {
  let wrapper;
  let mockLocation;
  let mockRecentMovies;
  let mockFavoriteMovies;

  beforeEach(() => {
    mockLocation = { pathname: '/' };
    mockRecentMovies = [{ title: 'It Takes Two', movie_id: 344911 }, { title: 'Step Brothers', movie_id: 324982 }];
    mockFavoriteMovies = [{ title: 'Step Brothers', movie_id: 324982 }];

    wrapper = shallow(<Sidebar location={mockLocation} renderRecent={true} recentMovies={mockRecentMovies} />);
  });

  it('should match the snapshot if renderRecent is true', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot if renderRecent is false', () => {
    mockLocation = { pathname: '/Favorite Movies' };

    wrapper = shallow(<Sidebar location={mockLocation} renderRecent={false} favoriteMovies={mockFavoriteMovies} recentMovies={mockRecentMovies} />);

    expect(wrapper).toMatchSnapshot();
  });

  describe('mapStateToProps', () => {

    it('should map recentMovies, favoriteMovies, and renderRecent to props', () => {
      const mockState = {
        recentMovies: [{ title: 'Fight Club' }],
        favoriteMovies: [],
        renderRecent: true,
        selectedMovie: 12345,
        userID: 13
      };
      const expected = {
        recentMovies: [{ title: 'Fight Club' }],
        favoriteMovies: [],
        renderRecent: true
      };

      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(expected);
    });
  });

});