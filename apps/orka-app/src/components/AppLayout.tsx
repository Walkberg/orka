import { Outlet } from 'react-router-dom';
import { UserButton, OrganizationSwitcher } from '@orka-react';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
        <h1 className="text-lg font-semibold">Orka App</h1>
        <div className="flex items-center gap-4">
          <UserButton />
        </div>
      </header>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
