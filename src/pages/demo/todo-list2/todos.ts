let nextId = 0;
let calls = 0;

export function getVisibleTodos(todos: Todo[], showActive: boolean) {
  console.log(`getVisibleTodos() 被调用了 ${++calls} 次`);
  const activeTodos = todos.filter((todo) => !todo.completed);
  const visibleTodos = showActive ? activeTodos : todos;
  return visibleTodos;
}

export function createTodo(text: string, completed = false) {
  return {
    id: nextId++,
    text,
    completed,
  };
}

export const initialTodos = [
  createTodo("买苹果", true),
  createTodo("买橘子", true),
  createTodo("买胡萝卜"),
];

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
