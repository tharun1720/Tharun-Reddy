import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import ordersReducer from './order';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: ordersReducer,
  },
});

export default store;
