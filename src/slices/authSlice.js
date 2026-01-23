import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api=process.env.API;
export const addNewUser = createAsyncThunk(
  "auth/signUp",
  async ({ username, password },{rejectWithValue}) => {
    try{
      const response = await axios.post(
        `${api}/auth/signUp`,
        { username, password });
      return response.data;
    }catch(error) {
      return rejectWithValue(error.response.data || "Error with creating new user")
    }
  }
);


export const logIn = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${api}/auth/login`, {
        username,
        password,
      });
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error logging in");
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    users: [],
    currentUser: null,
    username:null,
    password:null,
    loading: false,
    error: null,
    token: null,
  },
reducers:{
setUsername:(state,action)=>  {
  state.username = action.payload;
},
setPassword:(state,action)=> {
  state.password = action.payload;
}
},
  extraReducers: (builder) => {
    builder
      // signUp
      .addCase(addNewUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.loading = false;   
        state.users.push(action.payload);
      })
      .addCase(addNewUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // login
      .addCase(logIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
     .addCase(logIn.fulfilled, (state, action) => {
  state.loading = false;

  state.currentUser = {
    id: action.payload.id,
    username: action.payload.username,
  token : action.payload.token

  };
  localStorage.setItem("token",action.payload.token)
})
      .addCase(logIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const {setUsername,setPassword} = authSlice.actions;
export default authSlice.reducer;