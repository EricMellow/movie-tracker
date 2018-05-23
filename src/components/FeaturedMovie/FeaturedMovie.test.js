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

    wrapper = shallow(<FeaturedMovie {...props} />);
  });

  it('should match the snapshot', () => {

    expect(wrapper).toMatchSnapshot();
  });

  it('should instatiate with default state', () => {

  })
  describe('handleFavoriteClick', () => {
    it('should call toggleStoreFavorites with the correct argument', () => {

    });

    it('should call toggleFeatureMove', () => {

    });

    it('should call togglePromptLogin', () => {

    });
  });

  describe('toggleStoreFavorite', () => {
    it('should call deleteFavorite with the correct argument if isAFavorite is true', () => {

    });

    it('should call addFavorite with the correct argument if isAFavorite is false', () => {

    });
  });

  describe('toggleFeaturedMovie', () => {
    it('should call setFeaturedMovie with the correct argument if on the favorites page', () => {

    });

    it('should not call setFeaturedMovie if not on the favorites page', () => {

    });
  });

  describe('togglePromptLogin', () => {
    it('should set the state promptLogin:true if the userId does not exist', () => {

    });

    it('should set the state with promptLogin: false within a setTimeout call ', () => {

    });
  });

  describe('findFavorite', () => {
    it('should return a favorite movie if it is found in the favoriteMovies in props', () => {

    });
  });

  describe('deleteFavorite', () => {
    it('should call deleteFavoriteovie with the correct argument', () => {

    });

    it('should call deleteFavoriteFromDatabase with the correct argument', () => {

    });
  });

  describe('addFavorite', () => {
    it('should call addFavoriteMovie with the correct argument', () => {

    });

    it('should call addFavoriteToDatabase with the correct argument', () => {

    });
  });

  describe('addFavoriteToDatabase', () => {
    it('should call fetch with the correct arguments', () => {

    });
  });

  describe('deleteFavoriteFromDatabase', () => {
    it('should call fetch with the correct arguments', () => {

    });
  });

  describe('mapStateToProps', () => {
    it('should map recentMovies, movieId, userId, favoriteMovies to props', () => {

    });
  });

  describe('mapDispatchToProps', () => {
    it('should map addFavoriteMovie, deleteFavoriteMovie, setFeaturedMove to props',
      () => {

      });
  });


});