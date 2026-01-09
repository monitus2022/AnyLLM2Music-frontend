const music_plan_request = {
  "description": "8-bit music",
  "model": "x-ai/grok-4.1-fast",
  "music_parameters": {
    "genre_style": "8-bit chiptune",
    "tempo": "120 BPM",
    "key": "C minor",
    "time_signature": "4/4",
    "duration_seconds": 30,
    "mood_emotion": "energetic",
  },
  "kwargs": {}
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

const music_rhythm_request = {
  "description": "8-bit music",
  "music_chords": {
    "key": "C minor",
    "sections": [
      {
        "name": "Intro",
        "bars": 2,
        "chords": [
          "Cm",
          "Ab"
        ],
        "motifs": {
          "Intro": [
            1,
            2
          ]
        },
        "loop": "build to A"
      },
      {
        "name": "A",
        "bars": 4,
        "chords": [
          "Cm",
          "Bb",
          "Ab",
          "Eb"
        ],
        "motifs": {
          "A": [
            3,
            4,
            5,
            6
          ]
        },
        "loop": "to B"
      },
      {
        "name": "B",
        "bars": 4,
        "chords": [
          "Fm",
          "G",
          "Ab",
          "Bb"
        ],
        "motifs": {
          "B": [
            7,
            8,
            9,
            10
          ]
        },
        "loop": "back to A"
      },
      {
        "name": "A",
        "bars": 4,
        "chords": [
          "Cm",
          "Bb",
          "Ab",
          "Eb"
        ],
        "motifs": {
          "A": [
            11,
            12,
            13,
            14
          ]
        },
        "loop": "to Outro"
      },
      {
        "name": "Outro",
        "bars": 2,
        "chords": [
          "Bb",
          "Cm"
        ],
        "motifs": {
          "Outro": [
            15,
            16
          ]
        },
        "loop": "fade out"
      }
    ]
  }
}

const midi_request = {
  "music_plan": {},
  "music_rhythm": {}
}

const convert_midi_to_audio_request = {
  "soundfont": "8-bit",
  "midi_data": "base64-encoded-midi-data"
}