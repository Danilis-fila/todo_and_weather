import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodoItem, setFilter } from "../slices/todoSlice";
import TodoItem from "../todoItem/todoItem";
import './todoForm.scss'

const filters = {
    'Все': (item) => true,
    'Выполненные': (item) => item.completed,
    'Важные': (item) => item.isYouImportant
}

export default function TodoForm() {
    const dispatch = useDispatch();
    const [todoText, setTodoText] = useState('');
    const todos = useSelector((state) => state.todo.arrTodo)
    const currentFilter = useSelector((state) => state.todo.currentFilter)

    const addTodo = () => {
        if (todoText.trim().length) {
            const todo = {
                id: Date.now(),
                text: todoText,
                isYouImportant: false,
                completed: false
            }
            dispatch(addTodoItem(todo)) //Добавление todo в Redux и localStorage
            setTodoText('')
        }
    }

    const todoComponents = useMemo(() => {
        return todos?.filter((item) => {
            const filter_f = filters[currentFilter];
            return filter_f(item)
        }).map(item => (
            <TodoItem text={item.text} id={item.id} key={item.id} isYouImportant={item.isYouImportant} completed={item.completed} />
        ))
    }, [todos, currentFilter])

    const handleSelect = value => dispatch(setFilter(value))

    return (
        <div className="todo-form">
            <div className="menu">
                <input className="menu__input" type='text' value={todoText} onChange={(e) => setTodoText(e.target.value)}></input>
                <button className="menu__button" onClick={() => addTodo()}>Добавить</button>
                <select className="menu__select" onChange={(e) => handleSelect(e.target.value)}>
                    {
                        Object.keys(filters).map((title, index) => <option className="menu__option" key={index}>{title}</option>)
                    }
                </select>
            </div>
            <div className="todo-form__items">
                {
                    todos && todoComponents
                }
            </div>
        </div>
    );

}