import { API_BASE_URL } from '../config';
import { ENDPOINTS } from '../api';
import { MusicPlan, ChordResponse, RhythmResponse, MidiResponse, AudioResponse, ApiResponse } from '../types';

export const generatePlan = async (description: string, model: string, kwargs: Record<string, string>): Promise<{ result: MusicPlan; session_id?: string }> => {
  const url = `${API_BASE_URL}${ENDPOINTS.GENERATE_PLAN}`;
  const body = JSON.stringify({
    description,
    model,
    music_parameters: kwargs,
    kwargs: {}
  });
  console.log('Fetching:', url, 'with body:', body);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
  console.log('Response status:', response.status, response.statusText);
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Response error text:', errorText);
    throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
  }
  const data: ApiResponse<MusicPlan> = await response.json();
  console.log('Parsed response data:', data);
  return { result: data.result, session_id: data.session_id };
};

export const generateChords = async (description: string, plan: MusicPlan): Promise<{ result: ChordResponse; session_id?: string }> => {
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
  const data: ApiResponse<ChordResponse> = await response.json();
  return { result: data.result, session_id: data.session_id };
};

// Future functions for rhythm and midi
export const generateRhythm = async (description: string, chords: ChordResponse): Promise<{ result: RhythmResponse; session_id?: string }> => {
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
  const data: ApiResponse<RhythmResponse> = await response.json();
  return { result: data.result, session_id: data.session_id };
};

export const generateMidi = async (plan: MusicPlan, rhythm: RhythmResponse): Promise<{ result: MidiResponse; session_id?: string }> => {
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
  const data: ApiResponse<MidiResponse> = await response.json();
  return { result: data.result, session_id: data.session_id };
};

export const convertMidiToAudio = async (soundfont: string, midiData: string): Promise<{ result: AudioResponse; session_id?: string }> => {
  const response = await fetch(`${API_BASE_URL}${ENDPOINTS.CONVERT_MIDI_TO_AUDIO}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      soundfont,
      midi_data: midiData
    }),
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  const data: ApiResponse<AudioResponse> = await response.json();
  return { result: data.result, session_id: data.session_id };
};