import { Kwarg } from '../types';

interface MusicFormProps {
  description: string;
  setDescription: (value: string) => void;
  model: string;
  setModel: (value: string) => void;
  kwargs: Kwarg[];
  setKwargs: (value: Kwarg[]) => void;
  onSubmit: () => void;
  loading: boolean;
}

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
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Enter model name (leave empty for default)"
          className="w-full p-2 border rounded text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-black">Additional Parameters (kwargs):</label>
        {kwargs.map((param, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Key"
              value={param.key}
              onChange={(e) => {
                const newKwargs = [...kwargs];
                newKwargs[index].key = e.target.value;
                setKwargs(newKwargs);
              }}
              className="w-32 p-2 border rounded text-black"
            />
            <input
              type="text"
              placeholder="Value"
              value={param.value}
              onChange={(e) => {
                const newKwargs = [...kwargs];
                newKwargs[index].value = e.target.value;
                setKwargs(newKwargs);
              }}
              className="w-32 p-2 border rounded text-black"
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