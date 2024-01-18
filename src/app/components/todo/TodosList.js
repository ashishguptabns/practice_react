import React, { useState } from "react";
import { Button, Dropdown, Icon, } from "react-bulma-components";

/**
 * @param {{
 *  todos: { id: string; description: string; done: boolean; };
 *  onToggle: (id: string) => void;
 *  onDelete: (id: string) => void;
 * }} props
 *
 * @returns {JSX.Element}
 */
export default function TodosList({ todos, onToggle, onDelete }) {

  const [dropDownLabel, setDropDownLabel] = useState("All")
  const [showCrossId, setShowCrossId] = useState("")

  if (todos.length === 0) {
    return null;
  }

  const selectDropDown = (label) => {
    setDropDownLabel(label)
  }

  const getNotDoneCount = (todos) => {
    const notDoneArr = []
    for (const todo of todos) {
      if (!todo.done) {
        notDoneArr.push(todo)
      }
    }
    return notDoneArr
  }

  const handleClearCompleted = () => {
    for (const todo of todos) {
      if (todo.done) {
        onDelete(todo.id)
      }
    }
  }

  const handleShowCross = (id) => {
    setShowCrossId(id)
  }

  return (
    <>
      <ul>
        {todos.map((todo) => {
          if (dropDownLabel === 'Completed') {
            if (!todo.done) {
              return null
            }
          } else if (dropDownLabel === 'Active') {
            if (todo.done) {
              return null
            }
          } else {

          }
          return (
            <li key={todo.id} className="todo" data-done={todo.done}
              onMouseLeave={() => handleShowCross("")}
              onMouseEnter={() => { handleShowCross(todo.id) }}>
              <Button
                size="small"
                onClick={() => {
                  onToggle(todo.id);
                }}
                rounded
              >
                &#x2713;
              </Button>
              <div className="todo-description">{todo.description}</div>

              {showCrossId === todo.id && <Button
                remove
                onClick={() => {
                  onDelete(todo.id);
                }}
              />}
            </li>
          );
        })}
      </ul>
      {
        getNotDoneCount(todos) &&
        <div className="todo-bottom">
          <>{getNotDoneCount(todos).length} items left</>
          <Dropdown
            closeOnSelect={true}
            onChange={selectDropDown}
            color=""
            icon={<Icon><i aria-hidden="true" className="fas fa-angle-down" /></Icon>}
            label={dropDownLabel}
          >
            <Dropdown.Item
              renderAs="a"
              value="All"
            >
              All
            </Dropdown.Item>
            <Dropdown.Item
              renderAs="a"
              value="Active"
            >
              Active
            </Dropdown.Item>
            <Dropdown.Item
              renderAs="a"
              value="Completed"
            >
              Completed
            </Dropdown.Item>
          </Dropdown>
          <button className="btn-clear-completed" onClick={handleClearCompleted}>
            Clear Completed
          </button>
        </div>
      }
    </>
  );
}
