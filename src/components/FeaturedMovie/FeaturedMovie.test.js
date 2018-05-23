import React from 'react';
import { FeaturedMovie, mapStateToProps, mapDispatchToProps } from "./FeaturedMovie";
import { shallow } from 'enzyme';


describe('FeaturedMovie', () => {
  let wrapper;
  let props;

  beforeAll(() => {
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

  it('should instantiate with default state', () => {
    const result = wrapper.state();
    const expected = {
      promptLogin: false
    };
    expect(result).toEqual(expected);
  });

  describe('handleFavoriteClick', async () => {
    let wrapper;
    let props;

    beforeAll(() => {
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
        ],
        deleteFavoriteMovie: jest.fn()
      };

      wrapper = shallow(<FeaturedMovie {...props} />);
      wrapper.instance().toggleFeaturedMovie = jest.fn();
      wrapper.instance().togglePromptLogin = jest.fn();
      wrapper.instance().toggleStoreFavorite = jest.fn();
    });

    it('should call toggleStoreFavorite with the correct argument', async () => {
      //setup
      const mockSelectedMovie = {
        title: "Happy Days",
        movie_id: 12345,
        overview: 'string string string'
      };
      //execution
      await wrapper.instance().handleFavoriteClick();
      //assertion
      const result = wrapper.instance().toggleStoreFavorite;
      expect(result).toHaveBeenCalledWith(mockSelectedMovie);
    });

    it('should call toggleFeatureMove', async () => {
      await wrapper.instance().handleFavoriteClick();
      const result = wrapper.instance().toggleFeaturedMovie;
      expect(result).toHaveBeenCalled();
    });

    it('should call togglePromptLogin', async () => {
      await wrapper.instance().handleFavoriteClick();
      const result = wrapper.instance().togglePromptLogin;
      expect(result).toHaveBeenCalled();
    });
  });

  describe('toggleStoreFavorite', () => {
    let wrapper;
    let props;

    beforeAll(() => {
      props = {
        favoriteMovies: [{
          title: "Happy Days",
          movie_id: 12345,
          overview: 'string string string'
        }],
        movieId: 12345,
        userId: 2,
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
        ],
        deleteFavoriteMovie: jest.fn()
      };

      wrapper = shallow(<FeaturedMovie {...props} />);
    });
    it('should call deleteFavorite with the correct argument if isAFavorite is true', async () => {
      const mockSelectedMovie = {
        title: "Happy Days",
        movie_id: 12345,
        overview: 'string string string'
      };
      wrapper.instance().deleteFavorite = jest.fn();
      wrapper.instance().findFavorite = jest.fn().mockImplementation(()=>true);
      await wrapper.instance().toggleStoreFavorite(mockSelectedMovie);
      const result = wrapper.instance().deleteFavorite;
      expect(result).toHaveBeenCalledWith(mockSelectedMovie);
    });

    it.only('should call addFavorite with the correct argument if isAFavorite is false', async () => {
      const mockSelectedMovie = {
        title: "Happy Days",
        movie_id: 12345,
        overview: 'string string string'
      };
      wrapper.instance().deleteFavorite = jest.fn();
      wrapper.instance().findFavorite = jest.fn().mockImplementation(() => false);
      wrapper.instance().addFavorite = jest.fn();
      await wrapper.instance().toggleStoreFavorite(mockSelectedMovie);
      const result = wrapper.instance().addFavorite;
      expect(result).toHaveBeenCalledWith(mockSelectedMovie);
    });
  });

  describe('toggleFeaturedMovie', () => {
    let wrapper;
    let props;

    beforeAll(() => {
      props = {
        favoriteMovies: [{
          title: "Happy Days",
          movie_id: 12345,
          overview: 'string string string'
        }],
        movieId: 12345,
        userId: 2,
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
        ],
        deleteFavoriteMovie: jest.fn()
      };

      wrapper = shallow(<FeaturedMovie {...props} />);
    });
    
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
    it('should call dispatch with the correct parameters on addFavoriteMovie',
      () => {

      });

    it('should call dispatch with the correct parameters on deleteFavoriteMovie', () => {

    });

    it('should call dispatch with the correct parameters on setFeaturedMovie', () => {

    });


  });


});