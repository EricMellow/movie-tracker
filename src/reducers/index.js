import { combineReducers } from 'redux';
import { recentMoviesReducer } from './recentMoviesReducer';
import { userIdReducer } from "./userIdReducer";

export const rootReducer = combineReducers({
  recentMovies: recentMoviesReducer,
  userId: userIdReducer
});
