import React, { useState, useEffect } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import DatePicker from './components/DatePicker';
import { format, parse, compareAsc } from 'date-fns';

export interface Todo {
  id: string;
  text: string;
  date: string;
  time: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Load todos from localStorage when the app first mounts
  // Replace this with API call if you want to fetch todos from a server
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos'); // For API: fetch('/api/todos')
    if (storedTodos) {
      try {
        setTodos(JSON.parse(storedTodos)); // For API: setTodos(await response.json())
      } catch (error) {
        console.error('Error parsing todos from localStorage', error);
      }
    }
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Save todos to localStorage whenever the todos state changes
  // For API usage, replace with POST/PUT request to save todos on a server
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos)); // For API: await fetch('/api/todos', { method: 'POST', body: JSON.stringify(todos) })
    }
  }, [todos]); // This runs every time `todos` changes

  // Add a new todo
  const addTodo = (todo: Todo) => {
    const updatedTodos = [...todos, todo];
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos)); // For API: await fetch('/api/todos', { method: 'POST', body: JSON.stringify(updatedTodos) })
  };

  // Toggle the completed status of a todo
  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos)); // For API: await fetch('/api/todos', { method: 'PUT', body: JSON.stringify(updatedTodos) })
  };

  // Delete a todo
  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos)); // For API: await fetch(`/api/todos/${id}`, { method: 'DELETE' })
  };

  // Edit a todo
  const editTodo = (id: string, updatedTodo: Todo) => {
    const updatedTodos = todos.map((todo) => (todo.id === id ? updatedTodo : todo));
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos)); // For API: await fetch(`/api/todos/${id}`, { method: 'PUT', body: JSON.stringify(updatedTodos) })
  };

  const filteredTodos = todos
    .filter((todo) => todo.date === format(selectedDate, 'yyyy-MM-dd'))
    .sort((a, b) => {
      const dateA = parse(`${a.date} ${a.time}`, 'yyyy-MM-dd HH:mm', new Date());
      const dateB = parse(`${b.date} ${b.time}`, 'yyyy-MM-dd HH:mm', new Date());
      return compareAsc(dateA, dateB);
    });

  return (
    <NextUIProvider>
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-5xl font-bold mb-10 text-center text-blue-600 dark:text-blue-400">Todo App</h1>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
            <TodoForm addTodo={addTodo} />
            <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          </div>
          <TodoList
            todos={filteredTodos}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        </div>
      </div>
    </NextUIProvider>
  );
}

export default App;
