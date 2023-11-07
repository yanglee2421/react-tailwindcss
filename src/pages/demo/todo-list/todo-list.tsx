// React Imports
import React from "react";

// Utils Imports
import { initialTodos, createTodo, Todo } from "./todos";

export function TodoList() {
  const [todos, setTodos] = React.useState(initialTodos);
  const [showActive, setShowActive] = React.useState(false);

  const activeTodos = todos.filter((todo) => !todo.completed);
  const visibleTodos = showActive ? activeTodos : todos;

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={showActive}
          onChange={(e) => setShowActive(e.target.checked)}
        />
        只显示未完成的事项
      </label>
      <br />
      <NewTodo onAdd={(newTodo) => setTodos([...todos, newTodo])} />
      <ul>
        {visibleTodos.map((todo) => (
          <li key={todo.id}>
            {todo.completed ? <s>{todo.text}</s> : todo.text}
          </li>
        ))}
      </ul>
      {Boolean(activeTodos.length) && (
        <footer>{activeTodos.length} 项待办</footer>
      )}
    </>
  );
}

function NewTodo({ onAdd }: NewTodo) {
  const [text, setText] = React.useState("");

  const handleAddClick = () => {
    setText("");
    onAdd(createTodo(text));
  };

  return (
    <>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleAddClick}>添加</button>
    </>
  );
}

export interface NewTodo {
  onAdd(todo: Todo): void;
}
