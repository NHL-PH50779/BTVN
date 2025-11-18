import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Todo {
  _id: string;
  name?: string;
  title?: string;
  description?: string;
  completed?: boolean;
  isCompleted?: boolean;
  priority?: number;
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface TodoState {
  todos: Todo[];
  loading: boolean;
  inputText: string;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  inputText: "",
};

const API_URL = "https://api-class-o1lo.onrender.com/api/v1/todos";

export const fetchTodos = createAsyncThunk("todos/fetch", async () => {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data.data as Todo[];
});

// --- CREATE ---
export const addTodo = createAsyncThunk(
  "todos/add",
  async (todoData: {
    title: string;
    description: string;
    priority: number;
    dueDate: string;
  }) => {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todoData),
    });

    const res = await fetch(API_URL);
    const data = await res.json();
    return data.data as Todo[];
  }
);


export const toggleTodo = createAsyncThunk(
  "todos/toggle",
  async (todo: Todo) => {
    const res = await fetch(`${API_URL}/${todo._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !todo.completed }),
    });
    const data = await res.json();
    return data.data as Todo;
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/delete",
  async (id: string) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    return id;
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setInputText: (state, action: PayloadAction<string>) => {
      state.inputText = action.payload;
    },
    clearInputText: (state) => {
      state.inputText = "";
    },
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
 .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (t) => t._id === action.payload._id
        );
        state.todos[index] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((t) => t._id !== action.payload);
      });
  },
});

export const { setInputText, clearInputText } = todosSlice.actions;

export const selectTodos = (state: RootState) => state.todos.todos;
export const selectInputText = (state: RootState) => state.todos.inputText;

export default todosSlice.reducer;
