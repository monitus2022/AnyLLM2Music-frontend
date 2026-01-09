import type { ChordResponse } from '../types/music';
import type { ChordDisplayProps } from '../types/components';

export default function ChordDisplay({ chordData }: ChordDisplayProps) {
  if (!chordData) return null;

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded">
      <h2 className="text-lg font-semibold mb-2">Generated Chords:</h2>
      <p className="text-black mb-4">Key: {chordData.key}</p>
      <div className="space-y-4">
        {chordData.sections.map((section, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-medium text-gray-800">
              {section.name} ({section.bars} bars)
            </h3>
            <p className="text-sm text-gray-600 mb-1">
              Chords: {section.chords.join(' → ')}
            </p>
            <p className="text-xs text-gray-500">
              Loop: {section.loop}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}