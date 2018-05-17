import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../Header/Header';
import { shallow, mount } from 'enzyme';
import { mockRawData, mockCleanData } from '../../cleaners/mockData';

describe('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Header />, { disableLifecycleMethods: true })
  });

  it.skip('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  
  });
  