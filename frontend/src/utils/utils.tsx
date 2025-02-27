const API_URL = import.meta.env.REACT_APP_API_URL || "http://127.0.0.1:5000/api/todos"

export const getTodos = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const addTodo = async (title: string, priority: string) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, priority }),
  });
  return response.json();
};

export const updateTodo = async (id: number, completed: boolean, date: Date) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed, date }),
  });
  return response.json();
};

export const deleteTodo = async (id: number) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};

// export const clearTodoList = async () => await fetch(`${API_URL}/clear`, { method: "GET" })
