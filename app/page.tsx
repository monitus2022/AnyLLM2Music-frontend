'use client';

import { useState } from 'react';
import { API_BASE_URL } from './config';
import { ENDPOINTS } from './api';

export default function Home() {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [planData, setPlanData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.CREATE_MUSIC_PLAN}?description=${encodeURIComponent(description)}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setPlanData(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(errorMessage);
      console.error('Error generating music plan:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-black">AnyLLM2Music</h1>
        <p className="text-black">Can any LLM produce meaningful music? Let's find it out.</p>
        <br />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your music piece..."
          className="w-full p-2 border rounded mb-4 text-black"
          rows={4}
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !description.trim()}
          className="w-full bg-blue-500 text-white p-2 rounded mb-4 disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Music Plan'}
        </button>
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded">
            <h2 className="text-lg font-semibold mb-2 text-red-800">Error:</h2>
            <p className="text-red-700">{error}</p>
          </div>
        )}
        {planData && (
          <div className="mt-4 p-4 bg-gray-50 rounded">
            <h2 className="text-lg font-semibold mb-2">Music Plan:</h2>
            <pre className="text-sm text-gray-700 whitespace-pre-wrap">{JSON.stringify(planData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
