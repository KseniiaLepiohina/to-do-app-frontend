import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      
      // Якщо токен є, додаємо його в хедери
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Task"], 
  endpoints: (builder) => ({
    
    // --- АКТИВНІ ЗАВДАННЯ ---
    findAllActiveTasks: builder.query({
      query: () => "/task/active",
      providesTags: ["Task"],
    }),

    createTask: builder.mutation({
      query: (dto) => ({
        url: "/task",
        method: "POST",
        body: dto,
      }),
      invalidatesTags: ["Task"], 
    }),

    updateActiveTaskById: builder.mutation({
      query: ({ id, dto }) => ({
        url: `/task/active/update/${id}`,
        method: "PATCH",
        body: dto,
      }),
      invalidatesTags: ["Task"],
    }),

    deleteActiveTaskById: builder.mutation({
      query: ({ taskId, userId }) => ({
        url: `/task/active/delete/${taskId}/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),

    // --- ЗАВЕРШЕНІ ЗАВДАННЯ ---
    findAllCompleteTasks: builder.query({
      query: () => "/task/completed/find",
      providesTags: ["Task"],
    }),

    transferToCompletedTasks: builder.mutation({
      query: ({ taskId, userId }) => ({
        url: `/task/completed/${userId}/${taskId}`,
        method: "POST",
      }),
      invalidatesTags: ["Task"],
    }),

    deleteCompletedTaskById: builder.mutation({
      query: ({ taskId, userId }) => ({
        url: `/task/completed/delete/${taskId}/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useFindAllActiveTasksQuery,
  useFindAllCompleteTasksQuery,
  useCreateTaskMutation,
  useUpdateActiveTaskByIdMutation,
  useDeleteActiveTaskByIdMutation,
  useTransferToCompletedTasksMutation,
  useDeleteCompletedTaskByIdMutation,
} = taskApi;