import React from 'react';
import { FeaturedMovie, mapStateToProps, mapDispatchToProps } from "./FeaturedMovie";
import { shallow } from 'enzyme';

describe('Card', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<FeaturedMovie />);
  });

  it.skip('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

});