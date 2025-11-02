import React from 'react';
import {
  Input,
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
  Button,
} from '@walkberg-ui';
import { useApplicationUser } from '../providers/ApplicationUserProvider';

export const UserListHeader: React.FC = () => {
  const {
    searchTerm,
    updateSearch: handleSearchChange,
    sortBy,
    updateSortBy: handleSortChange,
    showCreateModal: setShowCreateModal,
  } = useApplicationUser();

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center space-x-4">
        <Input
          id="user-search-input"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.name)}
          className="w-64"
        />
        <Select value={sortBy} onValueChange={handleSortChange as any}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="lastname">Last Name</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={() => setShowCreateModal(true)}>Create User</Button>
    </div>
  );
};
