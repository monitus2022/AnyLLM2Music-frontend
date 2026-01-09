'use client';

import { useState, useEffect, useRef } from 'react';
import MusicForm from './MusicForm';
import ErrorDisplay from './ErrorDisplay';
import MusicPlanEditor from './MusicPlanEditor';
import ChordDisplay from './ChordDisplay';
import RhythmDisplay from './RhythmDisplay';
import MidiDisplay from './MidiDisplay';
import ProgressDisplay from './ProgressDisplay';
import type { ProgressMessage } from '../types/api';
import type { MusicSliderProps } from '../types/components';

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
  progress,
  handleSubmit,
  handlePlanUpdate,
  handleSubmitPlan,
  handleGenerateRhythm,
  handleGenerateMidi,
  handleConvertToAudio,
}: MusicSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

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
            <ProgressDisplay progress={progress} loading={loading} />
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
            <ProgressDisplay progress={progress} loading={loading} />
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
            <button
              onClick={handleGenerateRhythm}
              disabled={loading}
              className="w-full bg-green-500 text-white p-2 rounded mb-4 disabled:opacity-50"
            >
              {loading ? 'Generating Rhythm...' : 'Generate Rhythm'}
            </button>
            <ProgressDisplay progress={progress} loading={loading} />
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
            <button
              onClick={handleGenerateMidi}
              disabled={loading}
              className="w-full bg-purple-500 text-white p-2 rounded mb-4 disabled:opacity-50"
            >
              {loading ? 'Generating MIDI...' : 'Generate MIDI'}
            </button>
            <ProgressDisplay progress={progress} loading={loading} />
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
            <ProgressDisplay progress={progress} loading={loadingAudio} />
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
      {/* Slider Container */}
      <div className="overflow-hidden rounded-lg shadow-lg">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} ref={(el) => { slideRefs.current[slide.id] = el; }} className="w-full flex-shrink-0 p-6 bg-white">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">{slide.title}</h2>
              {slide.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}