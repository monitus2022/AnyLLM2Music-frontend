import { API_BASE_URL } from '../config';
import { ENDPOINTS } from '../api';
import { MusicPlan, ChordResponse, RhythmResponse, MidiResponse } from '../types';

export const generatePlan = async (description: string, model: string, kwargs: Record<string, string>): Promise<MusicPlan> => {
  const response = await fetch(`${API_BASE_URL}${ENDPOINTS.GENERATE_PLAN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      description,
      model,
      kwargs
    }),
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json();
};

export const generateChords = async (description: string, plan: MusicPlan): Promise<ChordResponse> => {
  const response = await fetch(`${API_BASE_URL}${ENDPOINTS.GENERATE_CHORDS}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      description,
      music_plan: plan
    }),
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json();
};

// Future functions for rhythm and midi
export const generateRhythm = async (description: string, chords: ChordResponse): Promise<RhythmResponse> => {
  const response = await fetch(`${API_BASE_URL}${ENDPOINTS.GENERATE_RHYTHM}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      description,
      music_chords: chords
    }),
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json();
};

export const generateMidi = async (plan: MusicPlan, rhythm: RhythmResponse): Promise<MidiResponse> => {
  const response = await fetch(`${API_BASE_URL}${ENDPOINTS.GENERATE_MIDI}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      music_plan: plan,
      music_rhythm: rhythm
    }),
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json();
};