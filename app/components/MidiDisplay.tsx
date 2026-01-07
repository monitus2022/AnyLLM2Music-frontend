import { MidiResponse } from '../types';

interface MidiDisplayProps {
  midiData: MidiResponse | null;
}

export default function MidiDisplay({ midiData }: MidiDisplayProps) {
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

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded">
      <h2 className="text-lg font-semibold mb-2">Generated MIDI:</h2>
      <p className="text-black mb-4">{midiData.description}</p>
      <button
        onClick={downloadMidi}
        className="bg-green-500 text-white p-2 rounded"
      >
        Download MIDI File
      </button>
    </div>
  );
}