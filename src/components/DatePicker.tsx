import React from 'react';
import { Button, Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';
import { format, addDays, subDays } from 'date-fns';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface DatePickerProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, setSelectedDate }) => {
  const handlePrevDay = () => setSelectedDate(subDays(selectedDate, 1));
  const handleNextDay = () => setSelectedDate(addDays(selectedDate, 1));
  const handleToday = () => setSelectedDate(new Date());

  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Button
          color="secondary"
          variant="flat"
          startContent={<CalendarIcon size={20} />}
        >
          {format(selectedDate, 'MMMM d, yyyy')}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <Button isIconOnly variant="light" onClick={handlePrevDay}>
              <ChevronLeftIcon size={20} />
            </Button>
            <span className="text-lg text-black font-semibold">
              {format(selectedDate, 'MMMM d, yyyy')}
            </span>
            <Button isIconOnly variant="light" onClick={handleNextDay}>
              <ChevronRightIcon size={20} />
            </Button>
          </div>
          <Button color="primary" fullWidth onClick={handleToday}>
            Today
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;