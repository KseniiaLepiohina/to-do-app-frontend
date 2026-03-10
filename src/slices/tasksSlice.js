import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "task",
  initialState: {
    findActiveTasks: [],
    findCompletedTasks: [],
    title: "",
    description: "",
    taskStatus: "",
    loading: false,
    error: null,
  },
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    addTaskToCompleted: (state, action) => {
      const newTask = action.payload;
      const exists = state.findCompletedTasks.some(t => t.task_id === newTask.task_id);
      if (!exists) {
        state.findCompletedTasks.push(newTask);
      }
    },
    updateActiveTask:(state,action)=> {
      state.findActiveTasks = state.findActiveTasks.update(action.payload);
    },

    removeTaskFromCompleted: (state, action) => {
      state.findCompletedTasks = state.findCompletedTasks.filter(
        (id) => id !== action.payload
      );
    },
    removeFromActiveTasks:(state,action) => {
      state.findActiveTasks = state.findActiveTasks.filter((id)=> id !== action.payload);
    },
    setDeleteAllTasks: (state) => {
      state.findActiveTasks = [];
      state.findCompletedTasks = [];
    },
  },
})
export const { setTitle, setDescription, setDeleteAllTasks, addTaskToCompleted, removeTaskFromCompleted,updateActiveTask,removeFromActiveTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
