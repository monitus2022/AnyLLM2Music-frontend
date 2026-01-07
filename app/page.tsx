'use client';

import { useState } from 'react';
import { API_BASE_URL } from './config';
import { ENDPOINTS } from './api';

interface MidiResponse {
  description: string;
  midi_data: string;
}

export default function Home() {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [midiData, setMidiData] = useState<MidiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setMidiData(null);
    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.GENERATE_MIDI_FROM_DESCRIPTION}?description=${encodeURIComponent(description)}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setMidiData(data as MidiResponse);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(errorMessage);
      console.error('Error generating MIDI:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadMidi = () => {
    if (!midiData) return;
    const byteCharacters = atob(midiData.midi_data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'audio/midi' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated.mid';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
          {loading ? 'Generating...' : 'Generate MIDI'}
        </button>
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded">
            <h2 className="text-lg font-semibold mb-2 text-red-800">Error:</h2>
            <p className="text-red-700">{error}</p>
          </div>
        )}
        {midiData && (
          <div className="mt-4 p-4 bg-gray-50 rounded">
            <h2 className="text-lg font-semibold mb-2">Generated MIDI:</h2>
            <p className="text-black mb-4">{midiData.description}</p>
            <button
              onClick={downloadMidi}
              className="bg-green-500 text-white p-2 rounded"
            >
              Download MIDI File
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
