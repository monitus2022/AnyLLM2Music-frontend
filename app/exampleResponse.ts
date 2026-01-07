const music_plan_response = {
    "description": "8-bit music",
    "genre_style": "8-bit chiptune (NES-style square waves, triangle bass, noise percussion)",
    "mood_emotion": "Energetic and upbeat",
    "tempo_feel": {
        "bpm": 120,
        "meter": "4/4",
        "feel": "Straight 8th notes with punchy percussion"
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
            "role": "harmony"
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
            "bars": 6,
            "transition": "to B"
        },
        {
            "section": "B",
            "bars": 6,
            "transition": "back to A"
        },
        {
            "section": "Outro",
            "bars": 2,
            "transition": "fade out"
        }
    ],
    "motivic_ideas": {
        "Intro": "Rising C minor arpeggio",
        "A": "Driving staccato riff with bass ostinato",
        "B": "Faster counter-melody variation",
        "Outro": "Echoing riff fragments"
    },
    "dynamic_contour": "mf intro build to f in B, fade to p outro",
    "length_scale": {
        "total_bars": 16,
        "duration_seconds": "approx 30s at 120 BPM"
    },
    "looping_behavior": "Seamless loop from end of A back to A"
};

const music_chord_response = {
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