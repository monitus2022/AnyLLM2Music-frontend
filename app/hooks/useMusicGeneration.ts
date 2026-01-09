import { useState } from 'react';
import { generatePlan, generateChords, generateRhythm, generateMidi, convertMidiToAudio } from '../services/apiService';
import { MusicPlan, MidiResponse, Kwarg, ChordResponse, RhythmResponse, AudioResponse } from '../types';

export const useMusicGeneration = () => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [midiData, setMidiData] = useState<MidiResponse | null>(null);
  const [chordData, setChordData] = useState<ChordResponse | null>(null);
  const [rhythmData, setRhythmData] = useState<RhythmResponse | null>(null);
  const [musicPlan, setMusicPlan] = useState<MusicPlan | null>(null);
  const [editingPlan, setEditingPlan] = useState<MusicPlan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [model, setModel] = useState('x-ai/grok-4.1-fast');
  const [kwargs, setKwargs] = useState<Kwarg[]>([]);
  const [soundfont, setSoundfont] = useState('8-bit');
  const [audioData, setAudioData] = useState<AudioResponse | null>(null);
  const [loadingAudio, setLoadingAudio] = useState(false);

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
    if (!editingPlan || !rhythmData) return;
    setLoading(true);
    setError(null);
    try {
      const data = await generateMidi(editingPlan, rhythmData);
      setMidiData(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleConvertToAudio = async () => {
    if (!midiData) return;
    setLoadingAudio(true);
    setError(null);
    try {
      const data = await convertMidiToAudio(soundfont, midiData.midi_data);
      setAudioData(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(errorMessage);
    } finally {
      setLoadingAudio(false);
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
    soundfont,
    setSoundfont,
    audioData,
    loadingAudio,
    handleSubmit,
    handlePlanUpdate,
    handleSubmitPlan,
    handleGenerateRhythm,
    handleGenerateMidi,
    handleConvertToAudio,
  };
};