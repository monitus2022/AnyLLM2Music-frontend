'use client';

import { useState } from 'react';
import { API_BASE_URL } from './config';
import { ENDPOINTS } from './api';

interface MidiResponse {
  description: string;
  midi_data: string;
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
  instruments: Array<{
    name: string;
    role: string;
  }>;
  structure: Array<{
    section: string;
    bars: number;
    transition: string;
  }>;
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
  const [midiData, setMidiData] = useState<MidiResponse | null>(null);
  const [musicPlan, setMusicPlan] = useState<MusicPlan | null>(null);
  const [editingPlan, setEditingPlan] = useState<MusicPlan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [model, setModel] = useState('');
  const [kwargs, setKwargs] = useState<Array<{key: string, value: string}>>([]);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setMidiData(null);
    setMusicPlan(null);
    setEditingPlan(null);
    try {
      const kwargsObj = kwargs.reduce((acc, {key, value}) => {
        if (key.trim()) acc[key.trim()] = value.trim();
        return acc;
      }, {} as Record<string, string>);
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.GENERATE_PLAN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description,
          model,
          kwargs: kwargsObj
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setMusicPlan(data);
      setEditingPlan({ ...data });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(errorMessage);
      console.error('Error generating plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlanUpdate = (field: string, value: any) => {
    if (!editingPlan) return;
    setEditingPlan({ ...editingPlan, [field]: value });
  };

  const handleSubmitPlan = async () => {
    if (!editingPlan) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.GENERATE_CHORDS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingPlan),
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      // For now, just log or handle the response; next step would process chords
      console.log('Generated chords:', data);
      // TODO: Handle chords response and proceed to rhythm or midi
      alert('Chords generated! Check console for details.');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(errorMessage);
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
      <div className="bg-white p-8 rounded shadow-md w-full max-w-xl">
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
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-black">Model:</label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Enter model name (leave empty for default)"
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-black">Additional Parameters (kwargs):</label>
          {kwargs.map((param, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Key"
                value={param.key}
                onChange={(e) => {
                  const newKwargs = [...kwargs];
                  newKwargs[index].key = e.target.value;
                  setKwargs(newKwargs);
                }}
                className="w-32 p-2 border rounded text-black"
              />
              <input
                type="text"
                placeholder="Value"
                value={param.value}
                onChange={(e) => {
                  const newKwargs = [...kwargs];
                  newKwargs[index].value = e.target.value;
                  setKwargs(newKwargs);
                }}
                className="w-32 p-2 border rounded text-black"
              />
              <button
                onClick={() => {
                  const newKwargs = kwargs.filter((_, i) => i !== index);
                  setKwargs(newKwargs);
                }}
                className="px-3 py-2 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() => setKwargs([...kwargs, { key: '', value: '' }])}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Parameter
          </button>
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading || !description.trim()}
          className="w-full bg-blue-500 text-white p-2 rounded mb-4 disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Plan'}
        </button>
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded">
            <h2 className="text-lg font-semibold mb-2 text-red-800">Error:</h2>
            <p className="text-red-700">{error}</p>
          </div>
        )}
        {musicPlan && editingPlan && (
          <div className="mt-4 p-4 bg-gray-50 rounded">
            <h2 className="text-lg font-semibold mb-4">Music Plan - Edit as needed</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Genre/Style:</label>
              <input
                type="text"
                value={editingPlan.genre_style}
                onChange={(e) => handlePlanUpdate('genre_style', e.target.value)}
                className="w-full p-2 border rounded text-black"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Mood/Emotion:</label>
              <input
                type="text"
                value={editingPlan.mood_emotion}
                onChange={(e) => handlePlanUpdate('mood_emotion', e.target.value)}
                className="w-full p-2 border rounded text-black"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">BPM:</label>
              <input
                type="number"
                value={editingPlan.tempo_feel.bpm}
                onChange={(e) => handlePlanUpdate('tempo_feel', { ...editingPlan.tempo_feel, bpm: parseInt(e.target.value) || 0 })}
                className="w-full p-2 border rounded text-black"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Meter:</label>
              <input
                type="text"
                value={editingPlan.tempo_feel.meter}
                onChange={(e) => handlePlanUpdate('tempo_feel', { ...editingPlan.tempo_feel, meter: e.target.value })}
                className="w-full p-2 border rounded text-black"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Feel:</label>
              <input
                type="text"
                value={editingPlan.tempo_feel.feel}
                onChange={(e) => handlePlanUpdate('tempo_feel', { ...editingPlan.tempo_feel, feel: e.target.value })}
                className="w-full p-2 border rounded text-black"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Key/Tonality:</label>
              <input
                type="text"
                value={editingPlan.key_tonality}
                onChange={(e) => handlePlanUpdate('key_tonality', e.target.value)}
                className="w-full p-2 border rounded text-black"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Instruments:</label>
              {editingPlan.instruments.map((instrument, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Name"
                    value={instrument.name}
                    onChange={(e) => {
                      const newInstruments = [...editingPlan.instruments];
                      newInstruments[index].name = e.target.value;
                      handlePlanUpdate('instruments', newInstruments);
                    }}
                    className="flex-1 p-2 border rounded text-black"
                  />
                  <input
                    type="text"
                    placeholder="Role"
                    value={instrument.role}
                    onChange={(e) => {
                      const newInstruments = [...editingPlan.instruments];
                      newInstruments[index].role = e.target.value;
                      handlePlanUpdate('instruments', newInstruments);
                    }}
                    className="flex-1 p-2 border rounded text-black"
                  />
                  <button
                    onClick={() => {
                      const newInstruments = editingPlan.instruments.filter((_, i) => i !== index);
                      handlePlanUpdate('instruments', newInstruments);
                    }}
                    className="px-3 py-2 bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => handlePlanUpdate('instruments', [...editingPlan.instruments, { name: '', role: '' }])}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Add Instrument
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Structure:</label>
              {editingPlan.structure.map((section, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Section"
                    value={section.section}
                    onChange={(e) => {
                      const newStructure = [...editingPlan.structure];
                      newStructure[index].section = e.target.value;
                      handlePlanUpdate('structure', newStructure);
                    }}
                    className="flex-1 p-2 border rounded text-black"
                  />
                  <input
                    type="number"
                    placeholder="Bars"
                    value={section.bars}
                    onChange={(e) => {
                      const newStructure = [...editingPlan.structure];
                      newStructure[index].bars = parseInt(e.target.value) || 0;
                      handlePlanUpdate('structure', newStructure);
                    }}
                    className="flex-1 p-2 border rounded text-black"
                  />
                  <input
                    type="text"
                    placeholder="Transition"
                    value={section.transition}
                    onChange={(e) => {
                      const newStructure = [...editingPlan.structure];
                      newStructure[index].transition = e.target.value;
                      handlePlanUpdate('structure', newStructure);
                    }}
                    className="flex-1 p-2 border rounded text-black"
                  />
                  <button
                    onClick={() => {
                      const newStructure = editingPlan.structure.filter((_, i) => i !== index);
                      handlePlanUpdate('structure', newStructure);
                    }}
                    className="px-3 py-2 bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => handlePlanUpdate('structure', [...editingPlan.structure, { section: '', bars: 0, transition: '' }])}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Add Section
              </button>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setEditingPlan({ ...musicPlan })}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Reset to Original
              </button>
              <button
                onClick={handleSubmitPlan}
                disabled={loading}
                className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
              >
                {loading ? 'Generating Chords...' : 'Generate Chords'}
              </button>
            </div>
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
