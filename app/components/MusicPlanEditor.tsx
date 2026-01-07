import { MusicPlan } from '../types';

interface MusicPlanEditorProps {
  musicPlan: MusicPlan | null;
  editingPlan: MusicPlan | null;
  setEditingPlan: (plan: MusicPlan | null) => void;
  onPlanUpdate: (field: string, value: any) => void;
  onSubmitPlan: () => void;
  loading: boolean;
}

export default function MusicPlanEditor({
  musicPlan,
  editingPlan,
  setEditingPlan,
  onPlanUpdate,
  onSubmitPlan,
  loading
}: MusicPlanEditorProps) {
  if (!musicPlan || !editingPlan) return null;

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded">
      <h2 className="text-lg font-semibold mb-4">Music Plan - Edit as needed</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Genre/Style:</label>
        <input
          type="text"
          value={editingPlan.genre_style}
          onChange={(e) => onPlanUpdate('genre_style', e.target.value)}
          className="w-full p-2 border rounded text-black"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Mood/Emotion:</label>
        <input
          type="text"
          value={editingPlan.mood_emotion}
          onChange={(e) => onPlanUpdate('mood_emotion', e.target.value)}
          className="w-full p-2 border rounded text-black"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">BPM:</label>
        <input
          type="number"
          value={editingPlan.tempo_feel.bpm}
          onChange={(e) => onPlanUpdate('tempo_feel', { ...editingPlan.tempo_feel, bpm: parseInt(e.target.value) || 0 })}
          className="w-full p-2 border rounded text-black"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Meter:</label>
        <input
          type="text"
          value={editingPlan.tempo_feel.meter}
          onChange={(e) => onPlanUpdate('tempo_feel', { ...editingPlan.tempo_feel, meter: e.target.value })}
          className="w-full p-2 border rounded text-black"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Feel:</label>
        <input
          type="text"
          value={editingPlan.tempo_feel.feel}
          onChange={(e) => onPlanUpdate('tempo_feel', { ...editingPlan.tempo_feel, feel: e.target.value })}
          className="w-full p-2 border rounded text-black"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Key/Tonality:</label>
        <input
          type="text"
          value={editingPlan.key_tonality}
          onChange={(e) => onPlanUpdate('key_tonality', e.target.value)}
          className="w-full p-2 border rounded text-black"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Instruments:</label>
        {editingPlan.instruments.map((instrument, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Name"
              value={instrument.name}
              onChange={(e) => {
                const newInstruments = [...editingPlan.instruments];
                newInstruments[index].name = e.target.value;
                onPlanUpdate('instruments', newInstruments);
              }}
              className="w-32 p-2 border rounded text-black"
            />
            <input
              type="text"
              placeholder="Role"
              value={instrument.role}
              onChange={(e) => {
                const newInstruments = [...editingPlan.instruments];
                newInstruments[index].role = e.target.value;
                onPlanUpdate('instruments', newInstruments);
              }}
              className="w-32 p-2 border rounded text-black"
            />
            <button
              onClick={() => {
                const newInstruments = editingPlan.instruments.filter((_, i) => i !== index);
                onPlanUpdate('instruments', newInstruments);
              }}
              className="px-3 py-2 bg-red-500 text-white rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={() => onPlanUpdate('instruments', [...editingPlan.instruments, { name: '', role: '' }])}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Instrument
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Structure:</label>
        {editingPlan.structure.map((section, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Section"
              value={section.section}
              onChange={(e) => {
                const newStructure = [...editingPlan.structure];
                newStructure[index].section = e.target.value;
                onPlanUpdate('structure', newStructure);
              }}
              className="w-32 p-2 border rounded text-black"
            />
            <input
              type="number"
              placeholder="Bars"
              value={section.bars}
              onChange={(e) => {
                const newStructure = [...editingPlan.structure];
                newStructure[index].bars = parseInt(e.target.value) || 0;
                onPlanUpdate('structure', newStructure);
              }}
              className="w-20 p-2 border rounded text-black"
            />
            <input
              type="text"
              placeholder="Transition"
              value={section.transition}
              onChange={(e) => {
                const newStructure = [...editingPlan.structure];
                newStructure[index].transition = e.target.value;
                onPlanUpdate('structure', newStructure);
              }}
              className="w-32 p-2 border rounded text-black"
            />
            <button
              onClick={() => {
                const newStructure = editingPlan.structure.filter((_, i) => i !== index);
                onPlanUpdate('structure', newStructure);
              }}
              className="px-3 py-2 bg-red-500 text-white rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={() => onPlanUpdate('structure', [...editingPlan.structure, { section: '', bars: 0, transition: '' }])}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Section
        </button>
      </div>

      <div className="flex gap-2 mt-6">
        <button
          onClick={() => setEditingPlan({ ...musicPlan })}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Reset to Original
        </button>
        <button
          onClick={onSubmitPlan}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
        >
          {loading ? 'Generating Chords...' : 'Generate Chords'}
        </button>
      </div>
    </div>
  );
}