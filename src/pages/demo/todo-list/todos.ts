let nextId = 0;

export function createTodo(text: string, completed = false): Todo {
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
