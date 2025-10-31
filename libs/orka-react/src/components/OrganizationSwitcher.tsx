import { useState } from 'react';
import { useOrganization } from '../providers/OrkaOrganizationProvider';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Input,
  Label,
  Card,
  CardContent,
  Separator,
} from '@walkberg-ui';
import { Plus, Building2, ChevronRight, Settings } from 'lucide-react';

export const OrganizationSwitcher = () => {
  const {
    organizations,
    currentOrganization,
    switchOrganization,
    createOrganization,
  } = useOrganization();

  const [isOpen, setIsOpen] = useState(false);
  const [orgName, setOrgName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async () => {
    if (!orgName.trim()) return;
    setIsCreating(true);
    await createOrganization({ name: orgName });
    setOrgName('');
    setIsCreating(false);
    setIsOpen(false);
  };

  return (
    <Card className="space-y-5 w-full max-w-sm">
      {currentOrganization && (
        <div className="border border-border shadow-sm">
          <div className="flex items-start justify-between p-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="h-5 w-5 text-primary" />
                <span className="font-medium text-lg">
                  {currentOrganization.name}
                </span>
              </div>
              {currentOrganization.description ? (
                <p className="text-sm text-muted-foreground">
                  n{currentOrganization.description}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  No description
                </p>
              )}
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full hover:bg-accent"
              title="Settings (coming soon)"
            >
              <Settings className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </div>
      )}
      <Separator />
      <div className="space-y-1">
        {organizations
          ?.filter((org) => org.id !== currentOrganization?.id)
          .map((org) => (
            <div
              key={org.id}
              className="flex items-center justify-between rounded-lg border border-transparent hover:border-border p-3 cursor-pointer transition-colors"
              onClick={() => switchOrganization(org.id)}
            >
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium">{org.name}</p>
                  {org.description && (
                    <p className="text-xs text-muted-foreground">
                      {org.description}
                    </p>
                  )}
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          ))}

        {organizations?.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-2">
            No organizations yet
          </p>
        )}
      </div>
      <Separator />
      <div className="flex justify-center">
        <Button
          variant="outline"
          className="rounded-full flex items-center gap-2"
          onClick={() => setIsOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Create organization
        </Button>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create an organization</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Label htmlFor="orgName">Organization name</Label>
            <Input
              id="orgName"
              placeholder="Ex: Design Team"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
            />
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={isCreating}>
              {isCreating ? 'Creating...' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
