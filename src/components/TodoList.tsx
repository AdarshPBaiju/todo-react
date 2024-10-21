import React, { useState } from 'react';
import { Card, Checkbox, CardBody, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input } from '@nextui-org/react';
import { Todo } from '../App';
import { Trash2Icon, EditIcon } from 'lucide-react';

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, updatedTodo: Todo) => void;
}

// Helper function to format date and time
const formatDateTime = (date: string, time: string) => {
  const fullDate = new Date(`${date}T${time}`);
  
  // Format date as Month day, Year
  const formattedDate = fullDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  
  // Format time in 12-hour format with AM/PM
  const formattedTime = fullDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return `${formattedDate} at ${formattedTime}`;
};

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo, deleteTodo, editTodo }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const handleEditClick = (todo: Todo) => {
    setEditingTodo(todo);
    onOpen();
  };

  const handleEditSubmit = () => {
    if (editingTodo) {
      editTodo(editingTodo.id, editingTodo);
      onClose();
    }
  };

  return (
    <div className="space-y-4">
      {todos.length === 0 ? (
        <Card>
          <CardBody className="text-center py-8">
            <p className="text-gray-500">No todos for this date. Add a new todo to get started!</p>
          </CardBody>
        </Card>
      ) : (
        todos.map((todo) => (
          <Card key={todo.id} className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardBody>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Checkbox
                    isSelected={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    color="success"
                  />
                  <div>
                    <p
                      className={`text-lg ${
                        todo.completed ? 'line-through text-gray-500' : 'text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      {todo.text}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDateTime(todo.date, todo.time)}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    isIconOnly
                    color="primary"
                    variant="light"
                    onPress={() => handleEditClick(todo)}
                    aria-label="Edit todo"
                  >
                    <EditIcon size={20} />
                  </Button>
                  <Button
                    isIconOnly
                    color="danger"
                    variant="light"
                    onPress={() => deleteTodo(todo.id)}
                    aria-label="Delete todo"
                  >
                    <Trash2Icon size={20} />
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        ))
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-black gap-1">Edit Todo</ModalHeader>
              <ModalBody>
                {editingTodo && (
                  <div className="space-y-4">
                    <Input
                      label="Todo"
                      value={editingTodo.text}
                      onChange={(e) => setEditingTodo({ ...editingTodo, text: e.target.value })}
                    />
                    <div className="flex gap-4">
                      <Input
                        type="date"
                        label="Date"
                        value={editingTodo.date}
                        onChange={(e) => setEditingTodo({ ...editingTodo, date: e.target.value })}
                      />
                      <Input
                        type="time"
                        label="Time"
                        value={editingTodo.time}
                        onChange={(e) => setEditingTodo({ ...editingTodo, time: e.target.value })}
                      />
                    </div>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleEditSubmit}>
                  Save Changes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TodoList;
