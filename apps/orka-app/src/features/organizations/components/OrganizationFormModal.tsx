import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Input,
  Button,
} from '@walkberg-ui';

interface OrganizationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: { name: string; description: string };
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: () => Promise<void>;
  title: string;
  description: string;
}

export function OrganizationFormModal({
  isOpen,
  onClose,
  formData,
  onInputChange,
  onSubmit,
  title,
  description,
}: OrganizationFormModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="orgName" className="text-right">
              Name
            </label>
            <Input
              id="orgName"
              name="name"
              value={formData.name}
              onChange={onInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="orgDescription" className="text-right">
              Description
            </label>
            <Input
              id="orgDescription"
              name="description"
              value={formData.description}
              onChange={onInputChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>
            {title.includes('Create') ? 'Create Organization' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
