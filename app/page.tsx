'use client';

import { useMusicGeneration } from './hooks/useMusicGeneration';
import MusicForm from './components/MusicForm';
import ErrorDisplay from './components/ErrorDisplay';
import MusicPlanEditor from './components/MusicPlanEditor';
import ChordDisplay from './components/ChordDisplay';
import RhythmDisplay from './components/RhythmDisplay';
import MidiDisplay from './components/MidiDisplay';

export default function Home() {
  const {
    description,
    setDescription,
    loading,
    midiData,
    chordData,
    rhythmData,
    musicPlan,
    editingPlan,
    setEditingPlan,
    error,
    model,
    setModel,
    kwargs,
    setKwargs,
    soundfont,
    setSoundfont,
    audioData,
    loadingAudio,
    handleSubmit,
    handlePlanUpdate,
    handleSubmitPlan,
    handleGenerateRhythm,
    handleGenerateMidi,
    handleConvertToAudio,
  } = useMusicGeneration();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-4 text-black">AnyLLM2Music</h1>
        <p className="text-black">Can any LLM produce meaningful music? Let's find it out.</p>
        <br />
        <MusicForm
          description={description}
          setDescription={setDescription}
          model={model}
          setModel={setModel}
          kwargs={kwargs}
          setKwargs={setKwargs}
          onSubmit={handleSubmit}
          loading={loading}
        />
        <ErrorDisplay error={error} />
        <MusicPlanEditor
          musicPlan={musicPlan}
          editingPlan={editingPlan}
          setEditingPlan={setEditingPlan}
          onPlanUpdate={handlePlanUpdate}
          onSubmitPlan={handleSubmitPlan}
          loading={loading}
        />
        <ChordDisplay chordData={chordData} />
        {chordData && !rhythmData && (
          <div className="mt-4">
            <button
              onClick={handleGenerateRhythm}
              disabled={loading}
              className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
            >
              {loading ? 'Generating Rhythm...' : 'Generate Rhythm'}
            </button>
          </div>
        )}
        <RhythmDisplay rhythmData={rhythmData} />
        {rhythmData && !midiData && (
          <div className="mt-4">
            <button
              onClick={handleGenerateMidi}
              disabled={loading}
              className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
            >
              {loading ? 'Generating MIDI...' : 'Generate MIDI'}
            </button>
          </div>
        )}
        <MidiDisplay
          midiData={midiData}
          soundfont={soundfont}
          setSoundfont={setSoundfont}
          audioData={audioData}
          loadingAudio={loadingAudio}
          onConvertToAudio={handleConvertToAudio}
        />
      </div>
    </div>
  );
}
