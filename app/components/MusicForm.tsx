import type { MusicFormProps } from '../types/components';

const modelOptions = [
  'x-ai/grok-4.1-fast',
  // 'openai/gpt-4',
  // 'anthropic/claude-3'
];

const parameterOptions = [
  'genre_style',
  'tempo_bpm',
  'key_tonality',
  'time_signature',
  'duration_seconds',
  'mood_emotion'
];

const parameterHints: Record<string, string> = {
  genre_style: '8-bit chiptune',
  tempo_bpm: '120 BPM',
  key_tonality: 'C minor',
  time_signature: '4/4',
  duration_seconds: '30',
  mood_emotion: 'energetic'
};

export default function MusicForm({
  description,
  setDescription,
  model,
  setModel,
  kwargs,
  setKwargs,
  onSubmit,
  loading
}: MusicFormProps) {
  return (
    <>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe your music piece..."
        className="w-full p-2 border rounded mb-4 text-black"
        rows={4}
      />
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-black">Model:</label>
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-full p-2 border rounded text-black"
        >
          {modelOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-black">Additional Parameters:</label>
        {kwargs.map((param, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <select
              value={param.key}
              onChange={(e) => {
                const newKwargs = [...kwargs];
                newKwargs[index].key = e.target.value;
                setKwargs(newKwargs);
              }}
              className="w-40 p-2 border rounded text-black"
            >
              <option value="">Select Parameter</option>
              {parameterOptions.map((option) => (
                <option key={option} value={option}>
                  {option.replace('_', ' ')}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder={parameterHints[param.key] || 'Value'}
              value={param.value}
              onChange={(e) => {
                const newKwargs = [...kwargs];
                newKwargs[index].value = e.target.value;
                setKwargs(newKwargs);
              }}
              className="w-40 p-2 border rounded text-black"
            />
            <button
              onClick={() => {
                const newKwargs = kwargs.filter((_, i) => i !== index);
                setKwargs(newKwargs);
              }}
              className="px-3 py-2 bg-red-500 text-white rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={() => setKwargs([...kwargs, { key: '', value: '' }])}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Parameter
        </button>
      </div>
      <button
        onClick={onSubmit}
        disabled={loading || !description.trim()}
        className="w-full bg-blue-500 text-white p-2 rounded mb-4 disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate Plan'}
      </button>
    </>
  );
}