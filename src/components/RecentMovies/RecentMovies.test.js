import React from 'react';
import ReactDOM from 'react-dom';
import { RecentMovies, mapStateToProps } from '../RecentMovies/RecentMovies';
import { shallow } from 'enzyme';
import { mockRawData, mockCleanData } from '../../cleaners/mockData';


describe('RecentMovies', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<RecentMovies recentMovies={mockCleanData}/>, { disableLifecycleMethods: true });
  });

  it('should match the snapshot', () => {

    expect(wrapper).toMatchSnapshot();
  });

  it('should map the movies to props', () => {
    let state = {
      recentMovies: mockCleanData
    };

    let expected = {
      recentMovies: state.recentMovies
    };

    const mappedProps = mapStateToProps(state);

    expect(mappedProps).toEqual(expected);
  });
});
