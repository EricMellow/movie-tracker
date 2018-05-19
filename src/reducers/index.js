import { combineReducers } from 'redux';
import { recentMoviesReducer } from './recentMoviesReducer';
import { userIdReducer } from './userIdReducer';
import { setSelectedMovieIdReducer } from './setSelectedMovieIdReducer';
import { favoriteMoviesReducer } from "./favoriteMoviesReducer";

export const rootReducer = combineReducers({
  recentMovies: recentMoviesReducer,
  userId: userIdReducer,
  selectedMovieId: setSelectedMovieIdReducer,
  favoriteMovies: favoriteMoviesReducer
});
