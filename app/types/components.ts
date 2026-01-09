import type { MidiResponse, AudioResponse, ProgressMessage } from './api';
import type { MusicPlan, ChordResponse, RhythmResponse } from './music';
import type { Kwarg } from './common';

export interface ErrorDisplayProps {
  error: string | null;
}

export interface MusicSliderProps {
  description: string;
  setDescription: (desc: string) => void;
  loading: boolean;
  midiData: any;
  chordData: any;
  rhythmData: any;
  musicPlan: any;
  editingPlan: any;
  setEditingPlan: (plan: any) => void;
  error: string | null;
  model: string;
  setModel: (model: string) => void;
  kwargs: any[];
  setKwargs: (kwargs: any[]) => void;
  soundfont: string;
  setSoundfont: (soundfont: string) => void;
  audioData: any;
  loadingAudio: boolean;
  progress: ProgressMessage[];
  handleSubmit: () => void;
  handlePlanUpdate: (field: string, value: any) => void;
  handleSubmitPlan: () => void;
  handleGenerateRhythm: () => void;
  handleGenerateMidi: () => void;
  handleConvertToAudio: () => void;
}

export interface MidiDisplayProps {
  midiData: MidiResponse | null;
  soundfont: string;
  setSoundfont: (value: string) => void;
  audioData: AudioResponse | null;
  loadingAudio: boolean;
  onConvertToAudio: () => void;
}

export interface MusicPlanEditorProps {
  musicPlan: MusicPlan | null;
  editingPlan: MusicPlan | null;
  setEditingPlan: (plan: MusicPlan | null) => void;
  onPlanUpdate: (field: string, value: any) => void;
  onSubmitPlan: () => void;
  loading: boolean;
}

export interface ChordDisplayProps {
  chordData: ChordResponse | null;
}

export interface MusicFormProps {
  description: string;
  setDescription: (value: string) => void;
  model: string;
  setModel: (value: string) => void;
  kwargs: Kwarg[];
  setKwargs: (value: Kwarg[]) => void;
  onSubmit: () => void;
  loading: boolean;
}

export interface ProgressDisplayProps {
  progress: ProgressMessage[];
  loading: boolean;
}

export interface RhythmDisplayProps {
  rhythmData: RhythmResponse | null;
}