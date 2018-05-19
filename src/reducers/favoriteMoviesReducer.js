export const favoriteMoviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return [...state, action.selectedMovie];
    case 'ADD_STORED_FAVORITES':
      return [...state, ...action.favoriteMovies];
    default:
      return state;
  }
};