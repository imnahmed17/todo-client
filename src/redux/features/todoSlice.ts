import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type TTodo = {
    id: string;
    title: string;
    description: string;
    isCompleted?: boolean;
};

type TInitialState = {
    todos: TTodo[];
};

const initialState: TInitialState = {
    todos: [],
};

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<TTodo>) => {
            // state.todos.push({ ...action.payload, isCompleted: false });
            const newTodo = { ...action.payload, isCompleted: false };
            const completedTaskIndex = state.todos.findIndex(task => task.isCompleted);
            
            if (completedTaskIndex === -1) {
                state.todos.push(newTodo);
            } else {
                state.todos.splice(completedTaskIndex, 0, newTodo);
            }
        },
        removeTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter((item) => item.id !== action.payload);
        },
        toggleComplete: (state, action: PayloadAction<string>) => {
            // const task = state.todos.find((item) => item.id === action.payload);
            // task!.isCompleted = !task?.isCompleted;
            const index = state.todos.findIndex((item) => item.id === action.payload);
            const task = state.todos[index];
            task.isCompleted = !task.isCompleted;

            if (task.isCompleted) {
                state.todos.splice(index, 1);
                state.todos.push(task);
            } else {
                const completedTasks = state.todos.filter(task => task.isCompleted);
                const uncompletedTasks = state.todos.filter(task => !task.isCompleted);
                state.todos = [...uncompletedTasks, ...completedTasks];
            }
        },
    },
});

export const { addTodo, removeTodo, toggleComplete } = todoSlice.actions;

export default todoSlice.reducer;