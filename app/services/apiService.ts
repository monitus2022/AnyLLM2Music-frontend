import { API_BASE_URL } from '../config';
import { ENDPOINTS } from '../api';
import type { MusicPlan, ChordResponse, RhythmResponse } from '../types/music';
import type { MidiResponse, AudioResponse } from '../types/api';

export const generatePlan = async (description: string, model: string, kwargs: Record<string, string>): Promise<{ result: MusicPlan; session_id?: string }> => {
  const response = await fetch(`${API_BASE_URL}${ENDPOINTS.GENERATE_PLAN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      description,
      model,
      music_parameters: kwargs,
      kwargs: {}
    }),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
  }
  const data = await response.json();
  // Handle both wrapped and unwrapped responses
  if (data.result !== undefined) {
    return { result: data.result, session_id: data.session_id };
  } else {
    // Assume data is the result directly
    return { result: data as MusicPlan, session_id: undefined };
  }
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
  const data = await response.json();
  // Handle both wrapped and unwrapped responses
  if (data.result !== undefined) {
    return { result: data.result, session_id: data.session_id };
  } else {
    // Assume data is the result directly
    return { result: data as ChordResponse, session_id: undefined };
  }
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
  const data = await response.json();
  // Handle both wrapped and unwrapped responses
  if (data.result !== undefined) {
    return { result: data.result, session_id: data.session_id };
  } else {
    // Assume data is the result directly
    return { result: data as RhythmResponse, session_id: undefined };
  }
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
  const data = await response.json();
  // Handle both wrapped and unwrapped responses
  if (data.result !== undefined) {
    return { result: data.result, session_id: data.session_id };
  } else {
    // Assume data is the result directly
    return { result: data as MidiResponse, session_id: undefined };
  }
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
  const data = await response.json();
  // Handle both wrapped and unwrapped responses
  if (data.result !== undefined) {
    return { result: data.result, session_id: data.session_id };
  } else {
    // Assume data is the result directly
    return { result: data as AudioResponse, session_id: undefined };
  }
};