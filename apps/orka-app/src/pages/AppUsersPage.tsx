import { useParams } from 'react-router-dom';

export function AppUsersPage() {
  const { id } = useParams();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Utilisateurs de l’application {id}</h2>
      <p className="text-gray-600">
        Liste des utilisateurs (à implémenter plus tard)...
      </p>
    </div>
  );
}
