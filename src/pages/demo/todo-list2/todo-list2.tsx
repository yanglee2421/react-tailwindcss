// React Imports
import React from "react";

import { initialTodos, createTodo, getVisibleTodos } from "./todos";

export function TodoList2() {
  const [todos, setTodos] = React.useState(initialTodos);
  const [showActive, setShowActive] = React.useState(false);
  const [text, setText] = React.useState("");

  const visibleTodos = React.useMemo(() => {
    return getVisibleTodos(todos, showActive);
  }, [todos, showActive]);

  const handleAddClick = () => {
    setText("");
    setTodos((prev) => [...prev, createTodo(text)]);
  };

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
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleAddClick}>添加</button>
      <ul>
        {visibleTodos.map((todo) => (
          <li key={todo.id}>
            {todo.completed ? <s>{todo.text}</s> : todo.text}
          </li>
        ))}
      </ul>
    </>
  );
}
