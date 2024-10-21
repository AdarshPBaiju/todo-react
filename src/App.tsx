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

  useEffect(() => {
    const storedTodos = sessionStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, updatedTodo: Todo) => {
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
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