import React from 'react';
import { Sidebar, mapStateToProps, mapDispatchToProps } from "./Sidebar";
import { shallow } from 'enzyme';

describe('Card', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Sidebar />);
  });

  it.skip('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

});