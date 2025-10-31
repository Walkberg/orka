import { useState } from 'react';
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@walkberg-ui';
import { LogOut } from 'lucide-react';
import { useAuth } from '../providers/OrkaAuthProvider';
import { User } from '../api/orka-client';

export const UserButton = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  if (!user) {
    return null;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 rounded-full border border-border p-1 hover:bg-accent transition">
          <OrkaAvatar user={user} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64 p-4">
        <div className="flex items-center gap-3 mb-3">
          <OrkaAvatar user={user} />

          <div className="flex flex-col">
            <span className="font-medium text-sm">
              {user.firstname} {user.lastname}
            </span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full flex items-center gap-2"
          onClick={() => {
            setOpen(false);
            logout();
          }}
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </PopoverContent>
    </Popover>
  );
};

type OrkaAvatarProps = { user: User };

export const OrkaAvatar = ({ user }: OrkaAvatarProps) => {
  return (
    <Avatar className="h-10 w-10">
      {user.avatarUrl ? (
        <AvatarImage src={user.avatarUrl} alt={user.firstname} />
      ) : (
        <AvatarFallback>
          {user.firstname
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()}
          .
          {user.lastname
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()}
        </AvatarFallback>
      )}
    </Avatar>
  );
};
