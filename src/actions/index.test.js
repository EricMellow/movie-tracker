import * as action from "./index";

describe('setSelectedMovieId', () => {
  it('should create a selected movie action', () => {
    // setup
    const mockMovieId = 123;
    // exectuion
    const result = action.setSelectedMovieId(mockMovieId);
    // expectation
    const expected = {
      type: 'SET_SELECTED_MOVIE_ID',
      movieId: 123
    };

    expect(result).toEqual(expected);
  });
});

describe('addRecentMovies', () => {
  it('should add all recent movies', () => {
    // setup
    const mockRecentMovies = [{title: "Happy Days"}, {title: "Bad Days"}];
    // exectuion
    const result = action.addRecentMovies(mockRecentMovies);
    // expectation
    const expected = {
      type: 'ADD_RECENT_MOVIES',
      recentMovieData: mockRecentMovies
    };

    expect(result).toEqual(expected);
  });
});