import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './features/movies';
import userReducer from './features/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    movies: movieReducer,
  },
});

export default store;
