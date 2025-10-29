import { useAuth } from '../providers/OrkaAuthProvider';
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@walkberg-ui';

export const SignUp = () => {
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //await login(email, password);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card>
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-4">
                <div>
                  <label>First name</label>
                  <Input placeholder="First name" />
                </div>
                <div>
                  <label>Last name</label>
                  <Input placeholder="Last name" />
                </div>
              </div>
              <div>
                <label>User name</label>
                <Input placeholder="User name" />
              </div>
              <div>
                <label>Email</label>
                <Input placeholder="Email" type="email" />
              </div>
              <div>
                <label>Password</label>
                <Input placeholder="Password" type="password" />
              </div>
            </div>
            <Button variant="outline" type="submit" className="w-full mt-4">
              Continue
            </Button>
          </form>
          <div className="mt-4">
            already have an account?
            <a href="#" className="ml-2 text-blue-500">
              {' '}
              Sign in{' '}
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
