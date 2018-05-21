export const setSelectedMovieIdReducer = (state = 299536, action) => {
  switch (action.type) {
    case 'SET_SELECTED_MOVIE_ID':
      return action.movieId;
    default:
      return state;
  }
};