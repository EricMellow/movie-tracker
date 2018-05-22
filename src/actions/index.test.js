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