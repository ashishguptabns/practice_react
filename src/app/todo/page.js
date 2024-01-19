"use client"

import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { Form, } from "react-bulma-components";
import TodosList from "./components/todo/TodosList";
import styles from './page.module.css'

const Actions = {
    ADD_TODO: "ADD_TODO",
    DELETE_TODO: "DELETE_TODO",
    TOGGLE_TODO: "TOGGLE_TODO",
    FILTER_TODO: "FILTER_TODO",
};

function reducer(state, action) {
    switch (action.type) {
        case Actions.ADD_TODO: {
            const newTodo = {
                id: uuidv4(),
                description: action.payload,
                done: false,
            };
            return {
                ...state,
                todos: [...state.todos, newTodo],
            };
        }

        case Actions.FILTER_TODO:
            if (action.payload === 'ALL') {
                const filteredTodos = state.todos.filter((todo) => todo.id !== action.payload);
                return {
                    ...state,
                    todos: filteredTodos,
                };
            }
            return state;

        case Actions.DELETE_TODO: {
            const filteredTodos = state.todos.filter((todo) => todo.id !== action.payload);
            return {
                ...state,
                todos: filteredTodos,
            };
        }

        case Actions.TOGGLE_TODO: {
            const updatedTodos = state.todos.map((todo) =>
                todo.id === action.payload ? { ...todo, done: !todo.done } : todo
            );
            return {
                ...state,
                todos: updatedTodos,
            };
        }

        default:
            return state;
    }
}

export default function Todo() {
    const [state, dispatch] = useReducer(reducer, {
        todos: [],
    });

    const submitHandler = (event) => {

        event.preventDefault();

        const data = new FormData(event.target);
        const description = data.get("description");

        if (description) {
            dispatch({
                type: Actions.ADD_TODO,
                payload: description,
            });
        }

        event.target.reset()
    }

    function deleteHandler(todoId) {
        dispatch({
            type: Actions.DELETE_TODO,
            payload: todoId,
        });
    }

    function toggleHandler(todoId) {
        dispatch({
            type: Actions.TOGGLE_TODO,
            payload: todoId,
        });
    }
    return (
        <div className={styles.todo}>
            <form onSubmit={submitHandler}>
                <Form.Field>
                    <Form.Input
                        placeholder="Add item"
                        name="description"
                        autoComplete="off"
                    />
                </Form.Field>
            </form>

            <TodosList
                onDelete={deleteHandler}
                onToggle={toggleHandler}
                todos={state.todos}
            />
        </div>
    )
}