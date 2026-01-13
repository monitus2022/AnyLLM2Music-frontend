export interface MidiResponse {
  description: string;
  midi_data: string;
}

export interface AudioResponse {
  audio_data: string;
}

export interface ProgressMessage {
  type: 'progress' | 'error' | 'complete';
  stage: string;
  message: string;
  percentage?: number;
}

export interface ApiResponse<T> {
  result: T;
  session_id?: string;
}