import React, { useState } from 'react';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Todo } from '../App';
import { PlusIcon } from 'lucide-react';
import { format } from 'date-fns';

interface TodoFormProps {
  addTodo: (todo: Todo) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [text, setText] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(format(new Date(), 'HH:mm'));

  const handleSubmit = () => {
    if (!text.trim()) return;
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      date: format(date, 'yyyy-MM-dd'),
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
      <Modal isOpen={isOpen} onClose={onClose} className="top-0">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex text-black flex-col gap-1">Add New Todo</ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <input
                    className="w-full border border-gray-300 p-2 rounded"
                    placeholder="Enter your todo"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-1/2">
                      <label className="block mb-2 text-sm font-medium">Date</label>
                      <DatePicker
                        selected={date}
                        onChange={(date) => setDate(date!)}
                        className="w-full p-2 border border-gray-300 rounded"
                        dateFormat="yyyy-MM-dd"
                        showPopperArrow={false}
                        withPortal // Ensures the date picker appears at the top in small screens
                      />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label className="block mb-2 text-sm font-medium">Time</label>
                      <input
                        type="time"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        placeholder="HH:mm"
                        step="30"
                      />
                    </div>
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
