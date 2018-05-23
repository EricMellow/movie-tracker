export const favoriteMoviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return [...state, action.selectedMovie];
    case 'ADD_STORED_FAVORITES':
      return [...state, ...action.favoriteMovies];
    case 'DELETE_FAVORITE':
      return state.filter((movie) => {
        return action.selectedMovie.movie_id !== movie.movie_id;
      });
    case 'LOGOUT':
      return [];
    default:
      return state;
  }
};