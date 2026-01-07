export interface MidiResponse {
  description: string;
  midi_data: string;
}

export interface MusicPlan {
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

export interface Kwarg {
  key: string;
  value: string;
}

export interface ChordSection {
  name: string;
  bars: number;
  chords: string[];
  motifs: Record<string, number[]>;
  loop: string;
}

export interface ChordResponse {
  key: string;
  sections: ChordSection[];
}