const API_URL = "http://127.0.0.1:5000/todos"

export const getTodos = async () => {
  const response = await fetch(API_URL);
  console.log(response)
  return response.json();
};

export const addTodo = async (title: string) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return response.json();
};

export const updateTodo = async (id: number, completed: boolean) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
  return response.json();
};

export const deleteTodo = async (id: string) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};

export const clearList = async () => await fetch(`${API_URL}/clear`, { method: "GET" })