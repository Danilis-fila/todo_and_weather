import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    arrTodo: JSON.parse(localStorage.getItem('items')) || [],
    currentFilter: 'Все'
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
     //объект функций которые будут управлять нашим состоянием
    reducers: {
        addTodoItem: (state, action) => {
            state.arrTodo.push(action.payload)
            localStorage.setItem('items', JSON.stringify(state.arrTodo))
        },
        removeTodoItem: (state, action) => {
            const newTodos = state.arrTodo.filter((todo) => todo.id !== action.payload)
            state.arrTodo = newTodos
            localStorage.setItem('items', JSON.stringify(newTodos))
        },
        starTodoItem: (state, action) => {
            state.arrTodo.find((item) =>  {
                if (item.id === action.payload) {
                    item.isYouImportant ? item.isYouImportant = false : item.isYouImportant = true
                    localStorage.setItem('items', JSON.stringify(state.arrTodo))
                    return true;
                }
            })
        },
        completedTodoItem: (state, action) => {
            state.arrTodo.find((item) =>  {
                if (item.id === action.payload) {
                    item.completed ? item.completed = false : item.completed = true
                    localStorage.setItem('items', JSON.stringify(state.arrTodo))
                    return true;
                }
            })
        },
        setFilter: (state, action) => {
            state.currentFilter = action.payload
        },
        editItem: (state, action) => {
            state.arrTodo.find((item) =>  {
                if (item.id === action.payload.id) {
                    item.text = action.payload.text
                    localStorage.setItem('items', JSON.stringify(state.arrTodo))
                    return true;
                } 
            })
        }
    }
})

export const { addTodoItem, removeTodoItem, starTodoItem, completedTodoItem, setFilter, editItem } = todoSlice.actions
export default todoSlice.reducer