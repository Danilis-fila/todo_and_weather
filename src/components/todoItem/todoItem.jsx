import React, { memo, useState } from 'react';
import { useDispatch } from "react-redux";
import { completedTodoItem, removeTodoItem, starTodoItem, editItem } from "../slices/todoSlice";
import './todoItem.scss'

export default memo(
    function TodoItem({ text, id, isYouImportant, completed }) {
        const dispatch = useDispatch();

        const [isEdit, setIsEdit] = useState(false)
        const [value, setValue] = useState('')
        const [oldValue, setOldValue] = useState('')

        const removeTodo = id => dispatch(removeTodoItem(id)) // Удаление todo из Redux и localStorage
        const starTodo = id => dispatch(starTodoItem(id))
        const completedTodo = id => dispatch(completedTodoItem(id))

        const editTodo = (text) => {
            setIsEdit(true)
            setValue(text)
            setOldValue(text)
        }

        const saveEdit = (id) => {
            if (value !== oldValue && value.trim().length) {
                const data = {
                    id: id,
                    text: value
                }
                dispatch(editItem(data));
                setIsEdit(false)
            }
        }  
        
        

        return (
            <div className={`todo-item ${completed && 'todo-item--completed'}`}>
                <div className="todo-item__title">
                    {
                        isEdit
                            ?
                            <div className='item-edit'>
                                <input className="item-edit__input" value={value} onChange={(e) => setValue(e.target.value)}></input>
                                <button className="item-edit__button" onClick={() => saveEdit(id)}>ок</button>
                                <button className="item-edit__button" onClick={() => setIsEdit(false)}>отмена</button>
                            </div>
                            :
                            <div className="item-title" onClick={() => completedTodo(id)}>{text}</div>
                    }
                </div>

                <div className="todo-item__menu">
                    {
                        isYouImportant 
                            ? 
                            <image className="todo-item__image--active im1" onClick={() => starTodo(id)} /> 
                            :
                            <image className="todo-item__image im2" onClick={() => starTodo(id)} />
                    }
                    <image className="todo-item__image im4" onClick={() => editTodo(text)} />
                    <image className="todo-item__image im3" onClick={() => removeTodo(id)} />
                </div>
            </div>
        )
    }
)