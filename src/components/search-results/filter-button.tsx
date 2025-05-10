'use client';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Command, CommandInput, CommandList, CommandItem } from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface FilterButtonProps {
  title: string;
  options: string[];
  value: string;
  onSelect: (value: string) => void;
  placeholder?: string;
}
const FilterButton = ({
  title,
  options,
  onSelect,
  placeholder,
  value,
}: FilterButtonProps) => {
    const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="text-sm hover:bg-purple-100 ">
          {value ? options.find((option) => option === value) : title}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            {options.map((type) => (
              <CommandItem
                key={type}
                onSelect={(currentValue) => {
                  onSelect(currentValue === value ? '' : currentValue);
                  setOpen(false); 
                }}
              >
                {type}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default FilterButton;
