import { useState } from 'react';
import { generatePlan, generateChords, generateRhythm, generateMidi } from '../services/apiService';
import { MusicPlan, MidiResponse, Kwarg, ChordResponse, RhythmResponse } from '../types';

export const useMusicGeneration = () => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [midiData, setMidiData] = useState<MidiResponse | null>(null);
  const [chordData, setChordData] = useState<ChordResponse | null>(null);
  const [rhythmData, setRhythmData] = useState<RhythmResponse | null>(null);
  const [musicPlan, setMusicPlan] = useState<MusicPlan | null>(null);
  const [editingPlan, setEditingPlan] = useState<MusicPlan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [model, setModel] = useState('');
  const [kwargs, setKwargs] = useState<Kwarg[]>([]);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setMidiData(null);
    setChordData(null);
    setRhythmData(null);
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
      const data = await generateChords(description, editingPlan);
      setChordData(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateRhythm = async () => {
    if (!chordData) return;
    setLoading(true);
    setError(null);
    try {
      const data = await generateRhythm(description, chordData);
      setRhythmData(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateMidi = async () => {
    if (!rhythmData) return;
    console.log('Generating MIDI with description:', description, 'and rhythmData:', rhythmData);
    setLoading(true);
    setError(null);
    try {
      const data = await generateMidi(description, rhythmData);
      console.log('MIDI generated:', data);
      setMidiData(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Error generating MIDI:', error);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    description,
    setDescription,
    loading,
    midiData,
    chordData,
    rhythmData,
    musicPlan,
    editingPlan,
    setEditingPlan,
    error,
    model,
    setModel,
    kwargs,
    setKwargs,
    handleSubmit,
    handlePlanUpdate,
    handleSubmitPlan,
    handleGenerateRhythm,
    handleGenerateMidi,
  };
};