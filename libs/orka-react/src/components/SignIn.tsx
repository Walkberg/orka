import { useOrka } from '../providers/OrkaProvider';
import { useAuth } from '../providers/OrkaAuthProvider';
import { useState } from 'react';
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@walkberg-ui';

export const SignIn = () => {
  const { login } = useAuth();
  const { appName } = useOrka();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [formState, setFormState] = useState<'email' | 'password'>('email');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Sign in to {appName}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <>
              {formState === 'email' && (
                <>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button
                    variant="outline"
                    type="submit"
                    className="w-full"
                    onClick={() => setFormState('password')}
                  >
                    Continue
                  </Button>
                </>
              )}
              {formState === 'password' && (
                <>
                  <Input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </>
              )}
            </>
          </form>
          <div className="mt-4">
            Dont have an account?
            <a href="#" className="ml-2 text-blue-500">
              {' '}
              Sign up{' '}
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
