import React from 'react';
import { FavoriteMovies, mapStateToProps } from "./FavoriteMovies";
import { shallow } from 'enzyme';

describe('Card', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<FavoriteMovies />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('mapStateToProps', () => {
    it('should map recentMovies to props', () => {
      const mockState = {
        recentMovies: [{ title: 'Fight Club' }],
        renderRecent: true,
        selectedMovie: 12345,
        userID: 13
      };
      const expected = { recentMovies: [{ title: 'Fight Club' }] };

      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(expected);
    });
  });
});