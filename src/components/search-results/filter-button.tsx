import { Button } from '../ui/button';
import { Command, CommandInput, CommandList, CommandItem } from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface FilterButtonProps {
  title: string;
  options: string[];
  onSelect: (value: string) => void;
  placeholder?: string;
}
const FilterButton = ({ title, options, onSelect, placeholder}: FilterButtonProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="text-sm hover:bg-purple-100 ">
          {title}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-0">
        <Command>
          <CommandInput placeholder = {placeholder} />
          <CommandList>
            {options.map(
              (type) => (
                <CommandItem
                  key={type}
                    onSelect={() => onSelect}
                >
                  {type}
                </CommandItem>
              )
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default FilterButton;
