'use client';

import { useState } from 'react';
import { API_BASE_URL } from './config';
import { ENDPOINTS } from './api';

interface Instrument {
  name: string;
  role: string;
}

interface StructureSection {
  section: string;
  bars: number;
  transition: string;
}

interface MusicPlan {
  genre_style: string;
  mood_emotion: string;
  tempo_feel: {
    bpm: number;
    meter: string;
    feel: string;
  };
  key_tonality: string;
  instruments: Instrument[];
  structure: StructureSection[];
  motivic_ideas: Record<string, string>;
  dynamic_contour: string;
  length_scale: {
    total_bars: number;
    duration_seconds: string;
  };
  looping_behavior: string;
}

export default function Home() {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [planData, setPlanData] = useState<MusicPlan | null>(null);
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
      setPlanData(data as MusicPlan);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(errorMessage);
      console.error('Error generating music plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderMusicPlan = (data: MusicPlan) => (
    <div>
      <div className="mb-4">
        <h3 className="font-semibold">Genre & Style</h3>
        <p>{data.genre_style}</p>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Mood & Emotion</h3>
        <p>{data.mood_emotion}</p>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Tempo & Feel</h3>
        <p>{data.tempo_feel.bpm} BPM, {data.tempo_feel.meter}, {data.tempo_feel.feel}</p>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Key & Tonality</h3>
        <p>{data.key_tonality}</p>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Instruments</h3>
        <ul className="list-disc list-inside">
          {data.instruments.map((inst, idx) => (
            <li key={idx}>{inst.name} - {inst.role}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Structure</h3>
        <ul className="list-disc list-inside">
          {data.structure.map((sec, idx) => (
            <li key={idx}>{sec.section}: {sec.bars} bars, {sec.transition}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Motivic Ideas</h3>
        <ul className="list-disc list-inside">
          {Object.entries(data.motivic_ideas).map(([key, value]) => (
            <li key={key}><strong>{key}:</strong> {value}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Dynamic Contour</h3>
        <p>{data.dynamic_contour}</p>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Length & Scale</h3>
        <p>{data.length_scale.total_bars} bars, {data.length_scale.duration_seconds}</p>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Looping Behavior</h3>
        <p>{data.looping_behavior}</p>
      </div>
    </div>
  );
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
            {renderMusicPlan(planData)}
          </div>
        )}
      </div>
    </div>
  );
}
