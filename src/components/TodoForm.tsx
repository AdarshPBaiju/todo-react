import React, { useState } from 'react';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input } from '@nextui-org/react';
import { Todo } from '../App';
import { PlusIcon } from 'lucide-react';
import { format } from 'date-fns';

interface TodoFormProps {
  addTodo: (todo: Todo) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [text, setText] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [time, setTime] = useState(format(new Date(), 'HH:mm'));

  const handleSubmit = () => {
    if (!text.trim()) return;
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      date,  // Date is already in 'yyyy-MM-dd' format
      time,  // Time is in 'HH:mm' format
      completed: false,
    };
    addTodo(newTodo);
    setText('');
    onClose();
  };

  return (
    <>
      <Button 
        color="primary" 
        onPress={onOpen}
        startContent={<PlusIcon size={20} />}
        className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        Add New Todo
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} className="top-0">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex text-black dark:text-white flex-col gap-1">Add New Todo</ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <Input
                    label="Todo"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter your task"
                    className="dark:bg-gray-800 dark:text-white"
                  />
                  <div className="flex gap-4">
                    <Input
                      type="date"
                      label="Date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}  // Handle string value from input
                      className="dark:bg-gray-800 dark:text-white"
                    />
                    <Input
                      type="time"
                      label="Time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}  // Handle time input
                      step="30"
                      className="dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  Add Todo
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default TodoForm;
