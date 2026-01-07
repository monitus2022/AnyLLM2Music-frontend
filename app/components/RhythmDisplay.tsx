import { RhythmResponse } from '../types';

interface RhythmDisplayProps {
  rhythmData: RhythmResponse | null;
}

export default function RhythmDisplay({ rhythmData }: RhythmDisplayProps) {
  if (!rhythmData) return null;

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded">
      <h2 className="text-lg font-semibold mb-2">Generated Rhythm:</h2>
      <div className="space-y-6">
        {rhythmData.sections.map((section, index) => (
          <div key={index} className="border-l-4 border-green-500 pl-4">
            <h3 className="font-medium text-gray-800 mb-2">
              {section.section} ({section.bars} bars)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Bass:</strong>
                <ul className="list-disc list-inside ml-2">
                  {section.bass.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
              <div>
                <strong>Percussion:</strong>
                <ul className="list-disc list-inside ml-2">
                  {section.perc.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
              <div>
                <strong>Melody:</strong>
                <ul className="list-disc list-inside ml-2">
                  {section.melody.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
              <div>
                <strong>Harmony:</strong>
                <ul className="list-disc list-inside ml-2">
                  {section.harmony.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
              <div>
                <strong>Voice Leading:</strong>
                <ul className="list-disc list-inside ml-2">
                  {section.voiceLeading.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
              <div>
                <strong>Dynamics:</strong>
                <ul className="list-disc list-inside ml-2">
                  {section.dynamics.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              <strong>Polyphony:</strong> {section.polyphony} | <strong>Loop:</strong> {section.loop}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}