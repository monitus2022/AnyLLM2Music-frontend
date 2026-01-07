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

const music_rhythm_response = {
  "sections": [
    {
      "section": "Intro",
      "bars": 2,
      "bass": [
        "Quarter C (Cm root) bar 1, half Ab (Ab root) bar 2, 8th fills C-G-Ab-Eb"
      ],
      "perc": [
        "Kick on 1 (vel 70) bars 1-2, hi-hat 8ths (vel 50) bars 1-2, subtle noise risers"
      ],
      "melody": [
        "Arpeggio C-Eb-G-C (16ths up, vel 60-80) bar 1, Ab-C-Eb-Ab (16ths, vel 70-90) bar 2"
      ],
      "harmony": [
        "Cm triad C-Eb-G sustain half bar 1 (vel 50), Ab triad Ab-C-Eb quarter to half bar 2 (vel 60)"
      ],
      "voiceLeading": [
        "Smooth step C to Ab bass, melody arpeggio leaps within triads"
      ],
      "dynamics": [
        "pp-mp (vel 40-70) bar 1, cresc to mf (vel 70-90) bar 2"
      ],
      "polyphony": "≤2 voices/channel",
      "loop": "build to A"
    },
    {
      "section": "A",
      "bars": 4,
      "bass": [
        "8ths C-G (Cm root-5th) bars 1-2, 8ths Bb-F (Bb root-5th) bar 3, Eb-Bb (Eb root-5th) bar 4"
      ],
      "perc": [
        "Kick on 1+3 (vel 90) bars 1-4, snare on 2+4 (vel 100) bars 1-4, hi-hat 16ths (vel 60-80) bars 1-4"
      ],
      "melody": [
        "Motif A: C-Db-D-Eb (chromatic rise 8ths, vel 90) bars 1+3, Eb-D-C-Bb (descend quarters vel 100) bar 2+4"
      ],
      "harmony": [
        "Cm C-Eb-G block chords quarters bar 1, Bb Bb-D-F 8ths bar 2, Ab Ab-C-Eb half bar 3, Eb Eb-G-Bb sustain bar 4 (vel 80)"
      ],
      "voiceLeading": [
        "Bass root motion stepwise C-Bb-Ab-Eb, melody contrary to bass"
      ],
      "dynamics": [
        "mf (vel 70-90) bars 1-2, f (vel 90-110) bars 3-4"
      ],
      "polyphony": "≤3 voices/channel, no unison overlaps",
      "loop": "to B"
    },
    {
      "section": "B",
      "bars": 4,
      "bass": [
        "8ths F-C (Fm root-5th) bar 1, G-D (G root-5th) bar 2, Ab-Eb bars 3, syncopated 16ths Bb-F-D bar 4"
      ],
      "perc": [
        "Kick on 1+3 (vel 100) bars 1-4, snare 2+4 + offbeat 16ths fills bar 4 (vel 110), hi-hat 8ths swung (vel 70)"
      ],
      "melody": [
        "Motif B: F-Ab-C-F (arpeggio 16ths vel 100) bar 1, G-B-D-G rise bar 2, Ab-C-Eb descend 8ths bar 3, Bb-D-F-Bb peak bar 4"
      ],
      "harmony": [
        "Fm F-Ab-C quarters bar 1 (vel 90), G G-B-D 8ths bar 2, Ab triad half bar 3, Bb block crescendo bar 4 (vel 100-120)"
      ],
      "voiceLeading": [
        "Bass ascends F-G-Ab-Bb, melody leaps G-B-D resolving down"
      ],
      "dynamics": [
        "f (vel 90-110) bars 1-3, ff peak (vel 110-130) bar 4"
      ],
      "polyphony": "≤2 voices/channel, layered arps",
      "loop": "back to A"
    },
    {
      "section": "A",
      "bars": 4,
      "bass": [
        "8ths C-G bars 1-2 (Cm), Bb-F bar 3, Eb-Bb-Eb 16ths bar 4"
      ],
      "perc": [
        "Kick 1+3 (vel 95) bars 1-4, snare 2+4 bars 1-3 snare roll 16ths bar 4 (vel 105), hi-hat 16ths"
      ],
      "melody": [
        "Motif A repeat: C-Db-D-Eb 8ths bars 1+3 (vel 95), Eb-D-C-Bb quarters bars 2+4 with vibrato"
      ],
      "harmony": [
        "Cm triad quarters bar 1, Bb 8ths bar 2, Ab half bar 3, Eb sustain + fills bar 4 (vel 85)"
      ],
      "voiceLeading": [
        "Parallel bass-motion as first A, melody tighter intervals"
      ],
      "dynamics": [
        "mf-f (vel 80-110) bars 1-3, ff (vel 110) bar 4"
      ],
      "polyphony": "≤3 voices/channel",
      "loop": "to Outro"
    },
    {
      "section": "Outro",
      "bars": 2,
      "bass": [
        "Half Bb (root) bar 1, quarter C-G descent bar 2"
      ],
      "perc": [
        "Kick on 1 (vel 80 decresc) bars 1-2, snare ghost 2+4 (vel 40-60), hi-hat 8ths fade"
      ],
      "melody": [
        "Bb-D-F-Bb arpeggio slow 8ths (vel 90-70) bar 1, C-Eb-G resolve quarters bar 2 (vel 80-50)"
      ],
      "harmony": [
        "Bb triad sustain half bar 1 (vel 70), Cm triad fade quarters bar 2 (vel 60-30)"
      ],
      "voiceLeading": [
        "Bass Bb to C root resolve, melody stepwise descent"
      ],
      "dynamics": [
        "mf to ppp (vel 90-30) bars 1-2"
      ],
      "polyphony": "≤2 voices/channel",
      "loop": "fade out"
    }
  ]
}