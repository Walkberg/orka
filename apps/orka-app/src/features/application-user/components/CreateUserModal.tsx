import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Input,
  Label,
} from '@walkberg-ui';
import { useApplicationUser } from '../providers/ApplicationUserProvider';

export const CreateUserModal: React.FC = () => {
  const {
    isCreateModalOpen: showCreateModal,
    showCreateModal: setShowCreateModal,
    newUserFormData,
    updateUserForm: handleInputChange,
    createUser: handleCreateUser,
  } = useApplicationUser();

  return (
    <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
          <DialogDescription>
            Enter the details below to create a new user for this application.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="firstName" className="text-right">
              First Name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              value={newUserFormData.firstName}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="lastName" className="text-right">
              Last Name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              value={newUserFormData.lastName}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              value={newUserFormData.email}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={newUserFormData.password}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreateUser}>Create User</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
