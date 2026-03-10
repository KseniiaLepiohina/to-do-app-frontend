import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
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
      query: ({ task_id, user_id }) => ({
        url: `/task/active/delete/${task_id}/${user_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),

    // --- ЗАВЕРШЕНІ ЗАВДАННЯ ---
    findAllCompleteTasks: builder.query({
      query: () => "/task/completed/find",
      providesTags: ["Task"],
    }),
addToCompletedTasks: builder.mutation({
  query: (taskData) => ({
    url: `task/completed/add`, // Чистий URL
    method: "POST",
    body: taskData, // Тут буде { task_id, title, description }
  }),
  invalidatesTags: ["Task"],
}),

    deleteCompletedTaskById: builder.mutation({
      query: ({ task_id, user_id }) => ({
        url: `/task/completed/delete/${task_id}/${user_id}`,
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
  useDeleteCompletedTaskByIdMutation,
  useAddToCompletedTasksMutation,
} = taskApi;