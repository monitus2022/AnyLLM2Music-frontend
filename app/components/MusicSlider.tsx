'use client';

import { useState, useEffect } from 'react';
import MusicForm from './MusicForm';
import ErrorDisplay from './ErrorDisplay';
import MusicPlanEditor from './MusicPlanEditor';
import ChordDisplay from './ChordDisplay';
import RhythmDisplay from './RhythmDisplay';
import MidiDisplay from './MidiDisplay';

interface MusicSliderProps {
  description: string;
  setDescription: (desc: string) => void;
  loading: boolean;
  midiData: any;
  chordData: any;
  rhythmData: any;
  musicPlan: any;
  editingPlan: any;
  setEditingPlan: (plan: any) => void;
  error: string | null;
  model: string;
  setModel: (model: string) => void;
  kwargs: any[];
  setKwargs: (kwargs: any[]) => void;
  soundfont: string;
  setSoundfont: (soundfont: string) => void;
  audioData: any;
  loadingAudio: boolean;
  handleSubmit: () => void;
  handlePlanUpdate: (field: string, value: any) => void;
  handleSubmitPlan: () => void;
  handleGenerateRhythm: () => void;
  handleGenerateMidi: () => void;
  handleConvertToAudio: () => void;
}

export default function MusicSlider({
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
}: MusicSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Determine available slides based on data
  const getSlides = () => {
    const slides = [
      {
        id: 0,
        title: 'Input',
        content: (
          <div className="space-y-4">
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
          </div>
        ),
      },
    ];

    if (musicPlan) {
      slides.push({
        id: 1,
        title: 'Music Plan',
        content: (
          <div className="space-y-4">
            <MusicPlanEditor
              musicPlan={musicPlan}
              editingPlan={editingPlan}
              setEditingPlan={setEditingPlan}
              onPlanUpdate={handlePlanUpdate}
              onSubmitPlan={handleSubmitPlan}
              loading={loading}
            />
            <ErrorDisplay error={error} />
          </div>
        ),
      });
    }

    if (chordData) {
      slides.push({
        id: 2,
        title: 'Chords',
        content: (
          <div className="space-y-4">
            <ChordDisplay chordData={chordData} />
            {!rhythmData && (
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
            <ErrorDisplay error={error} />
          </div>
        ),
      });
    }

    if (rhythmData) {
      slides.push({
        id: 3,
        title: 'Rhythm',
        content: (
          <div className="space-y-4">
            <RhythmDisplay rhythmData={rhythmData} />
            {!midiData && (
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
            <ErrorDisplay error={error} />
          </div>
        ),
      });
    }

    if (midiData) {
      slides.push({
        id: 4,
        title: 'MIDI',
        content: (
          <div className="space-y-4">
            <MidiDisplay
              midiData={midiData}
              soundfont={soundfont}
              setSoundfont={setSoundfont}
              audioData={audioData}
              loadingAudio={loadingAudio}
              onConvertToAudio={handleConvertToAudio}
            />
            <ErrorDisplay error={error} />
          </div>
        ),
      });
    }

    return slides;
  };

  const slides = getSlides();

  // Auto-advance to next slide when new data is available
  useEffect(() => {
    if (musicPlan && currentSlide === 0) setCurrentSlide(1);
    else if (chordData && currentSlide === 1) setCurrentSlide(2);
    else if (rhythmData && currentSlide === 2) setCurrentSlide(3);
    else if (midiData && currentSlide === 3) setCurrentSlide(4);
  }, [musicPlan, chordData, rhythmData, midiData, currentSlide]);

  const canGoNext = () => {
    switch (currentSlide) {
      case 0: return !!musicPlan;
      case 1: return !!chordData;
      case 2: return !!rhythmData;
      case 3: return !!midiData;
      default: return false;
    }
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1 && canGoNext()) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Navigation Arrows */}
      {currentSlide > 0 && (
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-2 shadow-md hover:bg-gray-50"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {(currentSlide < slides.length - 1 && canGoNext()) && (
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-2 shadow-md hover:bg-gray-50"
        >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        </button>
      )}

      {/* Slider Container */}
      <div className="overflow-hidden rounded-lg shadow-lg">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="w-full flex-shrink-0 p-6 bg-white">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">{slide.title}</h2>
              {slide.content}
            </div>
          ))}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center mt-4 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}