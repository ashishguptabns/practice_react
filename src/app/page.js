"use client"

import React, { useReducer } from "react";
import { useState } from 'react'
import styles from './page.module.css'
import { Modal } from './components/modal/modal'
import { WindowConfirm } from './components/window_confirm/view'
import { Counter } from './components/counter/counter'
import { Carousel } from './components/carousal/carousal'
import people from './components/carousal/data'
import { Form, } from "react-bulma-components";
import TodosList from "./components/todo/TodosList";
import { v4 as uuidv4 } from "uuid";

const Actions = {
  ADD_TODO: "ADD_TODO",
  DELETE_TODO: "DELETE_TODO",
  TOGGLE_TODO: "TOGGLE_TODO",
  FILTER_TODO: "FILTER_TODO",
};

function reducer(state, action) {
  switch (action.type) {
    case Actions.ADD_TODO: {
      state.todos = state.todos.concat([
        {
          id: uuidv4(),
          description: action.payload,
          done: false,
        },
      ]);

      break;
    }

    case Actions.FILTER_TODO:
      if (action.payload === 'ALL')
        state.todos = state.todos.filter((todo) => {
          return todo.id !== action.payload;
        });
      break

    case Actions.DELETE_TODO: {
      state.todos = state.todos.filter((todo) => {
        return todo.id !== action.payload;
      });

      break;
    }

    case Actions.TOGGLE_TODO: {
      const todo = state.todos.find((_todo) => _todo.id === action.payload);

      if (todo) {
        todo.done = !todo.done;
      }

      break;
    }

    default: {
      break;
    }
  }

  return {
    ...state,
  };
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, {
    todos: [],
  });

  function submitHandler(event) {

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
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className={styles.main}>
      <div className={styles.center}>
        {
          !isModalOpen &&
          <>
            <button className={styles.modalBtn} onClick={() => setIsModalOpen(true)}>Shared Modal</button>
            <WindowConfirm />
            <Counter />
            <Carousel people={people} />
            <>
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
            </>
          </>
        }
        {
          isModalOpen &&
          <Modal
            keepOpen={setIsModalOpen}
            handleCancel={() => setIsModalOpen(false)}
            handleOk={() => setIsModalOpen(false)}
            heading={"This is a shared Modal"}
          />
        }
      </div>
    </div>
  )
}
