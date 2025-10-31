import { useState, ChangeEvent } from 'react';
import {
  Button,
  Input,
  Label,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@walkberg-ui';
import { ImagePlus, Upload } from 'lucide-react';
import { useOrganization } from '../providers/OrkaOrganizationProvider';

interface CreateOrganizationProps {
  isSubmitting?: boolean;
}

export const CreateOrganization = ({
  isSubmitting = false,
}: CreateOrganizationProps) => {
  const { createOrganization } = useOrganization();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogo(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!name.trim()) return;
    await createOrganization({ name, description });
    setName('');
    setDescription('');
    setLogo(null);
    setPreview(null);
  };

  return (
    <Card className="w-full max-w-md mx-auto border border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-left">
          Create Organization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* --- Logo Preview & Upload --- */}
        <div className="flex flex-row space-y-3 items-center gap-10">
          <div className="w-24 h-24 rounded-full overflow-hidden border border-border flex items-center justify-center bg-muted">
            {preview ? (
              <img
                src={preview}
                alt="Logo preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <ImagePlus className="h-8 w-8 text-muted-foreground" />
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              htmlFor="logo-upload"
              className="flex items-center gap-2 cursor-pointer text-sm font-medium text-primary hover:underline"
            >
              Upload logo
            </Button>
            <Input
              id="logo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogoChange}
            />
            Recommended size: 1:1, upto 5MB
          </div>
        </div>

        {/* --- Name --- */}
        <div className="space-y-1">
          <Label htmlFor="name">Organization name</Label>
          <Input
            id="name"
            placeholder="Ex: Product Design Team"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* --- Description --- */}
        <div className="space-y-1">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            placeholder="A few words about your organization"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end pt-2">
        <Button onClick={handleSubmit} disabled={isSubmitting || !name.trim()}>
          {isSubmitting ? 'Creating...' : 'Create organization'}
        </Button>
      </CardFooter>
    </Card>
  );
};
