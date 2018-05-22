import { favoriteMoviesReducer } from "../favoriteMoviesReducer";

describe('favoriteMoviesReducer', () => {
  it('should add a selected movie to the favorite movies array', () => {
    // setup
    const initialState = [];
    const mockAction = {
      type: 'ADD_FAVORITE',
      selectedMovie: {title: 'Happy Days'}
    };
    // execution
    const result = favoriteMoviesReducer(initialState, mockAction);
    // expectation
    const expected = [{ title: 'Happy Days' }]
    expect(result).toEqual(expected);
  });

  it('return state if it is passed an action that does not match one of the types', () => {
    // setup
    const initialState = [];
    const mockAction = {
      type: 'ADD_POOP',
      selectedMovie: { title: 'Poop' }
    };
    // execution
    const result = favoriteMoviesReducer(initialState, mockAction);
    // expectation
    expect(result).toEqual(initialState);
  });
});
