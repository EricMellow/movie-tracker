import React from 'react';
import ReactDOM from 'react-dom';
import { RecentMovies } from '../RecentMovies/RecentMovies';
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


});