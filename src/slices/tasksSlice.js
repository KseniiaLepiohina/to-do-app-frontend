import {createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name:"task",
  initialState:{
    findActiveTasks:[],
    findCompletedTasks:[],
    title:"",
    description:"",
    taskStatus:"",
    loading:false,
    error:null,
  },
  reducers:{
setTitle:(state,action)=> {
  state.title = action.payload;
},
setDescription:(state,action)=> {
  state.description = action.payload;
},
setDeleteAllTasks:(state)=> {
state.findActiveTasks =[] ;
 state.findCompletedTasks =[];
},
  },
})
export const  {setTitle,setDescription,setDeleteAllTasks} = tasksSlice.actions;
export default tasksSlice.reducer;
