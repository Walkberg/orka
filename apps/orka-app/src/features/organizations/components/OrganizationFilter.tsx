import React from 'react';
import { useApplicationOrganizations } from '../providers/ApplicationOrganizationsProvider';
import {
  Label,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@walkberg-ui';

const OrganizationFilter: React.FC = () => {
  const { searchTerm, updateSearch, sortBy, updateSortBy } =
    useApplicationOrganizations();

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSearch(event.target.value);
  };

  const handleSortChange = (value: string) => {
    updateSortBy(value as any); // Cast to OrganizationSortBy type
  };

  return (
    <div className="mb-4 p-4 border rounded-md shadow-sm bg-white flex flex-col md:flex-row md:items-center gap-4">
      <div className="grow">
        <Label
          htmlFor="organization-filter"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Search Organizations
        </Label>
        <Input
          id="organization-filter"
          type="text"
          placeholder="Search by name or description..."
          value={searchTerm || ''}
          onChange={handleFilterChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="flex flex-col">
        <Label
          htmlFor="organization-sort"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Sort by
        </Label>
        <Select onValueChange={handleSortChange} defaultValue={sortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select sort order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="createdAt">Created Date</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default OrganizationFilter;
