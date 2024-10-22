import React, { useState } from 'react';
import { Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import { format } from 'date-fns';
import { Todo } from '../App';
import { PlusIcon } from 'lucide-react';

interface TodoFormProps {
  addTodo: (todo: Todo) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [text, setText] = useState('');
  const [date, setDate] = useState(format(new Date(), 'dd-MM-yyyy'));
  const [time, setTime] = useState(format(new Date(), 'HH:mm'));

  const handleSubmit = () => {
    if (!text.trim()) return;
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      date,
      time,
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
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        Add New Todo
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} className='top-0'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex text-black flex-col gap-1">Add New Todo</ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <Input
                    label="Todo"
                    placeholder="Enter your todo"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <div className="flex gap-4">
                    <Input
                      type="date"
                      label="Date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                    <Input
                      type="time"
                      label="Time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
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