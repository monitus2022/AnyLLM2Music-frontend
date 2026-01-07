'use client';

import { useState } from 'react';
import { generatePlan, generateChords } from './services/apiService';
import { MusicPlan, MidiResponse, Kwarg } from './types';
import MusicForm from './components/MusicForm';
import ErrorDisplay from './components/ErrorDisplay';
import MusicPlanEditor from './components/MusicPlanEditor';
import MidiDisplay from './components/MidiDisplay';

export default function Home() {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [midiData, setMidiData] = useState<MidiResponse | null>(null);
  const [musicPlan, setMusicPlan] = useState<MusicPlan | null>(null);
  const [editingPlan, setEditingPlan] = useState<MusicPlan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [model, setModel] = useState('');
  const [kwargs, setKwargs] = useState<Kwarg[]>([]);

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
      const data = await generatePlan(description, model, kwargsObj);
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
      const data = await generateChords(editingPlan);
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
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-4 text-black">AnyLLM2Music</h1>
        <p className="text-black">Can any LLM produce meaningful music? Let's find it out.</p>
        <br />
        <MusicForm
          description={description}
          setDescription={setDescription}
          model={model}
          setModel={setModel}
          kwargs={kwargs}
          setKwargs={setKwargs}
          onSubmit={handleSubmit}
          loading={loading}
        />
        <ErrorDisplay error={error} />
        <MusicPlanEditor
          musicPlan={musicPlan}
          editingPlan={editingPlan}
          setEditingPlan={setEditingPlan}
          onPlanUpdate={handlePlanUpdate}
          onSubmitPlan={handleSubmitPlan}
          loading={loading}
        />
        <MidiDisplay midiData={midiData} />
      </div>
    </div>
  );
}
