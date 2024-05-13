import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { removeTodo } from '../features/todoSlice';

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://todo-server-two-rust.vercel.app' }),
    tagTypes: ['todo'],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: (priority) => {
                const params = new URLSearchParams();

                if (priority) {
                    params.append('priority', priority);
                }

                return {
                    url: `/tasks`,
                    method: 'GET',
                    params: params,
                };
            },
            providesTags: ['todo'],
        }),
        addTodo: builder.mutation({
            query: (data) => ({
                url: '/task',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['todo'],
        }),
        removeTodo: builder.mutation({
            query: (id) => ({
                url: `/task/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['todo'],
        }),
        updateTodo: builder.mutation({
            query: (options) => {
                return {
                    url: `/task/${options.id}`,
                    method: 'PUT',
                    body: options.data,
                };
            },
            invalidatesTags: ['todo'],
        }),
    }),
});

export const { useGetTodosQuery, useAddTodoMutation, useRemoveTodoMutation, useUpdateTodoMutation } = baseApi; 