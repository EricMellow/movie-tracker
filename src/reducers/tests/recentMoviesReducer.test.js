import { recentMoviesReducer } from "../recentMoviesReducer";

describe('recentMoviesReducer', () => {

  it('should add recent movies if pass in an action type of ADD_RECENT_MOVIES', () => {
    const initialState = [];
    const mockAction = {
      type: 'ADD_RECENT_MOVIES',
      recentMovieData: [{title: 'Space Jam'}]
    };

    const result = recentMoviesReducer(initialState, mockAction);
    
    const expected = [{title: 'Space Jam'}];

    expect(result).toEqual(expected);
  });

  it('should return state if it is passed an action that does not have a type of ADD_RECENT_MOVIES', () => {
    const initialState = [];
    const mockAction = {
      type: 'YTHOU',
      recentMovieData: [{title: 'Space Jam'}]
    };

    const result = recentMoviesReducer(initialState, mockAction);

    expect(result).toEqual(initialState);
  });
});
