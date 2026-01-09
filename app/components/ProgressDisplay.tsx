import type { ProgressDisplayProps } from '../types/components';

export default function ProgressDisplay({ progress, loading }: ProgressDisplayProps) {
  if (!loading && progress.length === 0) return null;

  return (
    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
      <div className="font-medium text-blue-800 mb-2">Progress:</div>
      <div className="space-y-1">
        {progress.map((msg, index) => (
          <div
            key={index}
            className={`${
              msg.type === 'error' ? 'text-red-600' :
              msg.type === 'complete' ? 'text-green-600' :
              'text-blue-600'
            }`}
          >
            {msg.message}
          </div>
        ))}
        {loading && progress.length === 0 && (
          <div className="text-blue-600">Processing...</div>
        )}
      </div>
    </div>
  );
}