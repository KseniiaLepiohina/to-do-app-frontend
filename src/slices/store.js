import {configureStore} from '@reduxjs/toolkit';

import taskReducer from './tasksSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer:{
    task:taskReducer,
    auth:authReducer
  }
})
export default store;
console.log("AUTH REDUCER:", authReducer);
