import { favoriteMoviesReducer } from "../favoriteMoviesReducer";

describe('favoriteMoviesReducer', () => {
  it('should add a selected movie to the favorite movies array', () => {
    const initialState = [];
    const mockAction = {
      type: 'ADD_FAVORITE',
      selectedMovie: {title: 'Happy Days'}
    };
    const result = favoriteMoviesReducer(initialState, mockAction);
    const expected = [{ title: 'Happy Days' }]

    expect(result).toEqual(expected);
  });

  it('should add stored movies to favorite movies array', () => {
    const initialState = [];
    const mockAction = {
      type: 'ADD_STORED_FAVORITES',
      favoriteMovies: [{title: 'Happy Days'}, {title: 'Zoolander 2'}]
    };
    const result = favoriteMoviesReducer(initialState, mockAction);
    const expected = [{title: 'Happy Days'}, {title: 'Zoolander 2'}];

    expect(result).toEqual(expected);
  });


  it('should delete favorite movie', () => {
    const initialState = [
      { title: 'Sandlot',
        movie_id: 12345 
      },
      {
        title: 'Mission to Mars',
        movie_id: 89342
      }
  ];
    const mockAction = {
      type: 'DELETE_FAVORITE',
      selectedMovie: {
        title: 'Sandlot',
        movie_id: 12345 
      }
    };

    const result = favoriteMoviesReducer(initialState, mockAction);
    const expected = [      
      {
        title: 'Mission to Mars',
        movie_id: 89342
      }];

    expect(result).toEqual(expected);
  });
  
  it('should return state to empty array on logout', () => {
    const initialState = [{title: 'The Goonies'}];
    const mockAction = {
      type: 'LOGOUT'
    };

    const result = favoriteMoviesReducer(initialState, mockAction);
    const expected = [];

    expect(result).toEqual(expected);
  });

  it('return state if it is passed an action that does not match one of the types', () => {
    const initialState = [];
    const mockAction = {
      type: 'ADD_POOP',
      selectedMovie: { title: 'Poop' }
    };
    const result = favoriteMoviesReducer(initialState, mockAction);

    expect(result).toEqual(initialState);
  });
});
