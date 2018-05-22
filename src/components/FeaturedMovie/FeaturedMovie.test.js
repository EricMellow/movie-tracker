import React from 'react';
import { FeaturedMovie, mapStateToProps, mapDispatchToProps } from "./FeaturedMovie";
import { shallow } from 'enzyme';


describe('Card', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      favoriteMovies: [{
        title: "Happy Days",
        movie_id: 12345,
        overview: 'string string string'
      }],
      movieId: 12345,
      recentMovies: [
        {
          title: "Happy Days",
          movie_id: 12345,
          overview: 'string string string'
        },
        {
          title: "Sad Days",
          movie_id: 23456,
          overview: 'string string string'
        }
      ]
    };

    wrapper = shallow(<FeaturedMovie {...props}/>);
  });

  it('should match the snapshot', () => {

    expect(wrapper).toMatchSnapshot();
  });

});