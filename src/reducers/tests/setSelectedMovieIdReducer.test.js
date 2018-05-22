import { setSelectedMovieIdReducer } from "../setSelectedMovieIdReducer";

describe('setSelectedMovieIdReducer', () => {

  it('should return a movie id if it is passed an action type of SET_SELECTED_MOVIE_ID', () => {
    // setup
    const initialState = 0;
    const mockAction = {
      type: 'SET_SELECTED_MOVIE_ID',
      movieId: 290000
    };
    // execution
    const result = setSelectedMovieIdReducer(initialState, mockAction);
    // expectation
    expect(result).toEqual(290000);
  });

  it('should return state if it is passed an action that does not have a type of SET_SELECTED_MOVIE_ID', () => {
    // setup
    const initialState = 12345;
    const mockAction = {
      type: 'SET_POOP',
      movieId: 290000
    };
    // execution
    const result = setSelectedMovieIdReducer(initialState, mockAction);
    // expectation
    expect(result).toEqual(initialState);
  });
});
