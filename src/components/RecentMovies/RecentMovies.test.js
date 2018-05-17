import React from 'react';
import ReactDOM from 'react-dom';
import { RecentMovies } from '../RecentMovies/RecentMovies';
import { shallow } from 'enzyme';
import { mockRawData, mockCleanData } from '../../cleaners/mockData';
import configureStore from 'redux-mock-store';

describe('RecentMovies', () => {
  let wrapper;
  let mockStore;

  beforeEach(() => {
    const mockStore = configureStore();
    wrapper = shallow(<RecentMovies />, { disableLifecycleMethods: true });
  });

  it('should match the snapshot', () => {
    const initialState = mockCleanData;
    const store = mockStore(initialState);
    expect(wrapper).toMatchSnapshot();
  });


});