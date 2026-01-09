import { MidiResponse, AudioResponse, SOUND_FONTS } from '../types';

interface MidiDisplayProps {
  midiData: MidiResponse | null;
  soundfont: string;
  setSoundfont: (value: string) => void;
  audioData: AudioResponse | null;
  loadingAudio: boolean;
  onConvertToAudio: () => void;
}

export default function MidiDisplay({
  midiData,
  soundfont,
  setSoundfont,
  audioData,
  loadingAudio,
  onConvertToAudio,
}: MidiDisplayProps) {
  if (!midiData) return null;

  const downloadMidi = () => {
    const byteCharacters = atob(midiData.midi_data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'audio/midi' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated.mid';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAudio = () => {
    if (!audioData) return;
    const byteCharacters = atob(audioData.audio_data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated.wav';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded">
      <h2 className="text-lg font-semibold mb-2">Generated MIDI:</h2>
      <p className="text-black mb-4">{midiData.description}</p>
      <button
        onClick={downloadMidi}
        className="bg-green-500 text-white p-2 rounded mr-2"
      >
        Download MIDI File
      </button>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Soundfont:</label>
        <select
          value={soundfont}
          onChange={(e) => setSoundfont(e.target.value)}
          className="border border-gray-300 rounded p-2 mb-2"
        >
          {SOUND_FONTS.map(sf => <option key={sf} value={sf}>{sf}</option>)}
        </select>
        <button
          onClick={onConvertToAudio}
          disabled={loadingAudio}
          className="bg-blue-500 text-white p-2 rounded ml-2 disabled:opacity-50"
        >
          {loadingAudio ? 'Converting...' : 'Convert to Audio'}
        </button>
        {audioData && (
          <button
            onClick={downloadAudio}
            className="bg-purple-500 text-white p-2 rounded ml-2"
          >
            Download Audio File
          </button>
        )}
      </div>
    </div>
  );
}