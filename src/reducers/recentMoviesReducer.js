export const recentMoviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_RECENT_MOVIES':
      return [...action.recentMovieData];
    default:
      return state;
  }
};

