'use client';

import { useMusicGeneration } from './hooks/useMusicGeneration';
import MusicSlider from './components/MusicSlider';

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
    progress,
    handleSubmit,
    handlePlanUpdate,
    handleSubmitPlan,
    handleGenerateRhythm,
    handleGenerateMidi,
    handleConvertToAudio,
  } = useMusicGeneration();
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">AnyLLM2Music</h1>
          <p className="text-gray-600">Can any LLM produce meaningful music? Let's find it out.</p>
        </div>
        <MusicSlider
          description={description}
          setDescription={setDescription}
          loading={loading}
          midiData={midiData}
          chordData={chordData}
          rhythmData={rhythmData}
          musicPlan={musicPlan}
          editingPlan={editingPlan}
          setEditingPlan={setEditingPlan}
          error={error}
          model={model}
          setModel={setModel}
          kwargs={kwargs}
          setKwargs={setKwargs}
          soundfont={soundfont}
          setSoundfont={setSoundfont}
          audioData={audioData}
          loadingAudio={loadingAudio}
          progress={progress}
          handleSubmit={handleSubmit}
          handlePlanUpdate={handlePlanUpdate}
          handleSubmitPlan={handleSubmitPlan}
          handleGenerateRhythm={handleGenerateRhythm}
          handleGenerateMidi={handleGenerateMidi}
          handleConvertToAudio={handleConvertToAudio}
        />
      </div>
    </div>
  );
}
