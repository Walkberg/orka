import React from 'react';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  Button,
} from '@walkberg-ui';
import { PlusIcon, CalendarIcon, SearchIcon } from 'lucide-react';
import { useApplicationUser } from '../providers/ApplicationUserProvider';

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen: showCommandPalette,
    showCommandPalette: setShowCommandPalette,
    selectCommand,
  } = useApplicationUser();

  return (
    <CommandDialog
      open={showCommandPalette}
      onOpenChange={setShowCommandPalette}
      //label="Command Palette" // Added label for accessibility
    >
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => selectCommand('create-user')}>
            <Button variant="ghost" className="w-full justify-start px-2">
              <PlusIcon className="mr-2 h-4 w-4" />
              Create New User
            </Button>
          </CommandItem>

          <CommandItem onSelect={() => selectCommand('search-user')}>
            <Button variant="ghost" className="w-full justify-start px-2">
              <SearchIcon className="mr-2 h-4 w-4" />
              Search User
            </Button>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => selectCommand('go-dashboard')}>
            <Button variant="ghost" className="w-full justify-start px-2">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Go to Dashboard
            </Button>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
