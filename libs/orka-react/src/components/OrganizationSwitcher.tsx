import { useState } from 'react';
import { useOrganization } from '@/providers/OrkaOrganizationProvider';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Input,
  Label,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Separator,
} from '@walkberg-ui';
import { Plus, Building2 } from 'lucide-react';

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
    await createOrganization(orgName);
    setOrgName('');
    setIsCreating(false);
    setIsOpen(false);
  };

  return (
    <div className="space-y-4 w-full">
      {/* Sélecteur d'organisation */}
      <div className="flex flex-col space-y-2">
        <Label>Organisation actuelle</Label>
        <Select
          value={currentOrganization?.id}
          onValueChange={(id) => switchOrganization(id)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choisir une organisation" />
          </SelectTrigger>
          <SelectContent>
            {organizations?.length ? (
              organizations.map((org) => (
                <SelectItem key={org.id} value={org.id}>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    {org.name}
                  </div>
                </SelectItem>
              ))
            ) : (
              <div className="text-sm text-muted-foreground px-2 py-1.5">
                Aucune organisation
              </div>
            )}
          </SelectContent>
        </Select>
      </div>
      <Separator />
      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
        onClick={() => setIsOpen(true)}
      >
        <Plus className="h-4 w-4" />
        Créer une organisation
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Créer une organisation</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Label htmlFor="orgName">Nom de l’organisation</Label>
            <Input
              id="orgName"
              placeholder="Ex: Mon équipe de design"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
            />
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleCreate} disabled={isCreating}>
              {isCreating ? 'Création...' : 'Créer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
