import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addTask = createAsyncThunk(
  "task/create",
  async (dto) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:5000/task",
      dto, // дані таски
      { headers: { Authorization: `Bearer ${token}` } } // хедери
    );    console.log(localStorage.getItem("token"));

    return response.data;

  }
);


export const findAllActiveTasks = createAsyncThunk(
  "task/getActive",
  async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:5000/task/active",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }
);

export const updateActiveTaskById = createAsyncThunk(
  "task/update",
  async ({ id, dto }) => {
    const token = localStorage.getItem("token");
    const response = await axios.patch(
      `http://localhost:5000/task/active/update/${id}`,
      dto,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }
);

export const deleteActiveTaskById = createAsyncThunk(
  "task/delete",
  async ({ taskId, userId }) => {
    const token = localStorage.getItem("token");

    const response = await axios.delete(
      `http://localhost:5000/task/active/delete/${taskId}/${userId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  }
);

//completedTasks

export const transferIntoCompletedTasks = createAsyncThunk(
  "task/transferIntoCompletedTasks",
  async({taskId,userId,token}) => {

    const response = await axios.post(
      `http://localhost:5000/task/completed/${userId}/${taskId}`,
    {},{
      headers:{
        Authorization:`Bearer${token}`
      }
    })
    return response.data;
  }
)
export const findAllCompletedTasks = createAsyncThunk(
  "task/findAllCompleted",
  async()=> {
    const response = await  axios.get(
      `http://localhost:5000/task/completed/find`
    );
    return response.data;
  }
);

export const updateCompletedTaskById = createAsyncThunk(
  "task/updateCompletedTaskById",
  async({id})=> {
    const response = await axios.patch(
      `http://localhost:5000/task/completed/update/${id}`
    );
    return response.data;
  }
);

export const deleteCompletedTaskById = createAsyncThunk(
  "task/deleteCompletedTask",
  async({taskId,userId})=> {
    const response = await axios.delete(
      `http://localhost:5000/task/completed/delete/${taskId}/${userId}`
    );
    return response.data;
  }
);


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
  extraReducers:(builder) => {
    builder
    .addCase(addTask.pending,(state)=> {
      state.loading = true;
      state.error = null;
    })
    .addCase(addTask.fulfilled,(state,action)=> {
      state.loading = false;
      state.findActiveTasks.push(action.payload);
    })
    .addCase(addTask.rejected,(state,action)=> {
      state.loading = false;
      state.error = action.error.message;
    })
    //findActiveTasks
     .addCase(findAllActiveTasks.pending,(state)=> {
      state.loading = true;
      state.error = null;
    })
    .addCase(findAllActiveTasks.fulfilled,(state,action)=> {
      state.loading = false;
      state.findActiveTasks=action.payload;
    })
    .addCase(findAllActiveTasks.rejected,(state,action)=> {
      state.loading = false;
      state.error = action.payload;
    })

    //updateActiveTasks
  .addCase(updateActiveTaskById.pending,(state)=> {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateActiveTaskById.fulfilled, (state, action) => {
      state.loading = false;

      const updatedTask = action.payload;

      // Заміна таски в масиві
      state.findActiveTasks = state.findActiveTasks.map(task =>
        task.taskId === updatedTask.taskId ? updatedTask : task
      );
    })
    .addCase(updateActiveTaskById.rejected,(state,action)=> {
      state.loading = false;
      state.error = action.payload;
    })
//deleteActiveTaskById
.addCase(deleteActiveTaskById.pending,(state)=> {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteActiveTaskById.fulfilled, (state, action) => {
      state.loading = false;

      const { taskId } = action.meta.arg;

      // Видаляємо зі списку
      state.findActiveTasks = state.findActiveTasks.filter(
        task => task.taskId !== taskId
      );
    })
    .addCase(deleteActiveTaskById.rejected,(state,action)=> {
      state.loading = false;
      state.error = action.payload;
    })

//completedTasks

.addCase(transferIntoCompletedTasks.pending,(state)=> {
  state.loading = true;
  state.error = null;
})
.addCase(transferIntoCompletedTasks.fulfilled, (state, action) => {
  state.loading = false;

  const completedTask = action.payload; // вся таска з бекенду

  // Видаляємо з активних
  state.findActiveTasks = state.findActiveTasks.filter(
    t => t.taskId !== completedTask.taskId
  );

  // Додаємо у completed
  state.findCompletedTasks.push(completedTask);

})
.addCase(transferIntoCompletedTasks.rejected,(state,action)=> {
  state.loading = false;
  console.error('TRANSFER ERROR:', action.error);
  state.error = action.payload;
})

 .addCase(findAllCompletedTasks.pending,(state)=> {
      state.loading = true;
      state.error = null;
    })
    .addCase(findAllCompletedTasks.fulfilled,(state,action)=> {
      state.loading = false;
      state.findCompletedTasks = action.payload; 
    })
    .addCase(findAllCompletedTasks.rejected,(state,action)=> {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase(updateCompletedTaskById.pending,(state)=> {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateCompletedTaskById.fulfilled, (state, action) => {
      state.loading = false;

      const updatedTasks = action.payload;

      // Заміна таски в масиві
      state.findCompletedTasks = state.findCompletedTasks.map(task =>
        task.taskId === updatedTasks.taskId ? updatedTasks : task
      );
    })
    .addCase(updateCompletedTaskById.rejected,(state,action)=> {
      state.loading = false;
      state.error = action.payload;
    })

.addCase(deleteCompletedTaskById.pending,(state)=> {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteCompletedTaskById.fulfilled, (state, action) => {
      state.loading = false;

      const { taskId } = action.meta.arg;

      // Видаляємо зі списку
      state.findCompletedTasks = state.findCompletedTasks.filter(
        task => task.taskId !== taskId
      );
    })
    .addCase(deleteCompletedTaskById.rejected,(state,action)=> {
      state.loading = false;
      state.error = action.payload;
    })
  }

})
export const  {setTitle,setDescription,setDeleteAllTasks} = tasksSlice.actions;
export default tasksSlice.reducer;
