import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Input,
  Label,
} from '@walkberg-ui';

export const CreateApplication = ({
  onCreate,
}: {
  onCreate?: (name: string) => Promise<void> | void;
}) => {
  const [name, setName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsCreating(true);
    try {
      await onCreate?.(name);
      setName('');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10 shadow-md border border-gray-200">
      <CardHeader>
        <CardTitle>Create Application</CardTitle>
        <CardDescription>
          Enter a name to create a new application.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="appName">Application Name</Label>
            <Input
              id="appName"
              placeholder="e.g. My Awesome App"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isCreating || !name.trim()}>
            {isCreating ? 'Creating...' : 'Create Application'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
