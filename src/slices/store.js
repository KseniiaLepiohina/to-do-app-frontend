import {configureStore} from '@reduxjs/toolkit';
import { authApi } from '../services/authApi';
import taskReducer from './tasksSlice';
import authReducer from './authSlice';
import {taskApi} from '../services/taskApi';

const store = configureStore({
  reducer:{
    [taskApi.reducerPath]:taskApi.reducer,
    [authApi.reducerPath]:authApi.reducer,
    task:taskReducer,
    auth:authReducer
  },
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(taskApi.middleware, authApi.middleware)
})
export default store;
