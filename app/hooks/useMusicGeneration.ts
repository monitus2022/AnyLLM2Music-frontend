import { useState, useEffect, useRef } from 'react';
import { generatePlan, generateChords, generateRhythm, generateMidi, convertMidiToAudio } from '../services/apiService';
import { MusicPlan, MidiResponse, Kwarg, ChordResponse, RhythmResponse, AudioResponse, ProgressMessage } from '../types';
import { API_BASE_URL } from '../config';

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
  const [progress, setProgress] = useState<ProgressMessage[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  const connectWebSocket = (sessionId: string) => {
    if (wsRef.current) {
      wsRef.current.close();
    }
    const wsUrl = API_BASE_URL.replace(/^http/, 'ws') + `/v1/music/ws/progress/${sessionId}`;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      setProgress([]);
    };

    ws.onmessage = (event) => {
      const message: ProgressMessage = JSON.parse(event.data);
      setProgress(prev => [...prev, message]);
    };

    ws.onclose = () => {
      // Cleanup
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setProgress(prev => [...prev, { type: 'error', stage: 'websocket', message: 'Connection error' }]);
    };
  };

  const handleSubmit = async () => {
    console.log('Starting plan generation with description:', description);
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
      console.log('Calling generatePlan with:', { description, model, kwargsObj });
      const { result, session_id } = await generatePlan(description, model, kwargsObj);
      console.log('generatePlan response:', { result, session_id });
      setMusicPlan(result);
      setEditingPlan({ ...result });
      console.log('Music plan set:', result);
      if (session_id) {
        console.log('Connecting websocket with session_id:', session_id);
        connectWebSocket(session_id);
      } else {
        console.log('No session_id returned, skipping websocket');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Error generating plan:', error);
      setError(errorMessage);
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
      const { result, session_id } = await generateChords(description, editingPlan);
      setChordData(result);
      if (session_id) {
        connectWebSocket(session_id);
      }
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
      const { result, session_id } = await generateRhythm(description, chordData);
      setRhythmData(result);
      if (session_id) {
        connectWebSocket(session_id);
      }
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
      const { result, session_id } = await generateMidi(editingPlan, rhythmData);
      setMidiData(result);
      if (session_id) {
        connectWebSocket(session_id);
      }
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
      const { result, session_id } = await convertMidiToAudio(soundfont, midiData.midi_data);
      setAudioData(result);
      if (session_id) {
        connectWebSocket(session_id);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(errorMessage);
    } finally {
      setLoadingAudio(false);
    }
  };

  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

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
    progress,
    handleSubmit,
    handlePlanUpdate,
    handleSubmitPlan,
    handleGenerateRhythm,
    handleGenerateMidi,
    handleConvertToAudio,
  };
};