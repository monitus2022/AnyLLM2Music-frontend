import type { ErrorDisplayProps } from '../types/components';

export default function ErrorDisplay({ error }: ErrorDisplayProps) {
  if (!error) return null;
  return (
    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded">
      <h2 className="text-lg font-semibold mb-2 text-red-800">Error:</h2>
      <p className="text-red-700">{error}</p>
    </div>
  );
}