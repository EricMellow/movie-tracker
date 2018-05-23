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

});