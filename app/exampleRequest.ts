const music_plan_request = {
  "description": "8-bit music",
  "model": "",
  "kwargs": {
    "hint": ""
  }
}

const music_chord_request = {
  "description": "8-bit music",
  "music_plan": {
    "genre_style": "8-bit chiptune",
    "mood_emotion": "energetic",
    "tempo_feel": {
      "bpm": 120,
      "meter": "4/4",
      "feel": "Straight 8ths with chiptune percussion snap"
    },
    "key_tonality": "C minor",
    "instruments": [
      {
        "name": "Square Wave Lead",
        "role": "melody"
      },
      {
        "name": "Triangle Wave",
        "role": "bass"
      },
      {
        "name": "Noise Channel",
        "role": "percussion"
      },
      {
        "name": "Pulse Wave",
        "role": "chords"
      }
    ],
    "structure": [
      {
        "section": "Intro",
        "bars": 2,
        "transition": "build to A"
      },
      {
        "section": "A",
        "bars": 4,
        "transition": "to B"
      },
      {
        "section": "B",
        "bars": 4,
        "transition": "back to A"
      },
      {
        "section": "A",
        "bars": 4,
        "transition": "to Outro"
      },
      {
        "section": "Outro",
        "bars": 2,
        "transition": "fade out"
      }
    ],
    "motivic_ideas": {
      "Intro": "Rising C minor arpeggio",
      "A": "Staccato energetic riff",
      "B": "Faster counter-melody variation",
      "Outro": "Decaying riff resolve"
    },
    "dynamic_contour": "pp intro → mf A → f B → p outro",
    "length_scale": {
      "total_bars": 16,
      "duration_seconds": "approx 30s"
    },
    "looping_behavior": "Seamless loop A-B-A"
  }
}