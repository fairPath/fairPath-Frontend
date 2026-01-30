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
  onValueChange?: (value: string) => void;
}

const FilterButton = ({ title, options, onSelect, placeholder, value }: FilterButtonProps) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(value);

  const handleCommit = (val: string) => {
    onSelect(val);
    setSearchValue(val);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="text-sm hover:bg-purple-100">
          {value || title}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-0">
        <Command>
          <CommandInput
            value={searchValue}
            onValueChange={(val) => {
              setSearchValue(val);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleCommit(searchValue);
              }
            }}
            placeholder={placeholder}
          />
          <CommandList>
            {options.map((type) => (
              <CommandItem key={type} onSelect={() => handleCommit(type)}>
                {type}
              </CommandItem>
            ))}
            {searchValue && !options.includes(searchValue) && (
              <CommandItem onSelect={() => handleCommit(searchValue)}>
                Use custom: <strong>{searchValue}</strong>
              </CommandItem>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default FilterButton;
