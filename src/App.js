import React from "react";
import "./App.css";

const guitarFrequencyMap = {
  E: 82.41,
  A: 110,
  D: 146.83,
  G: 196,
  B: 246.94,
  e: 329.63,
};

const notes = ["E", "A", "D", "G", "B", "e"];
class Oscillator {
  constructor() {
    this.initializeOscillator();
  }

  initializeOscillator() {
    const audioCtx = new window.AudioContext();
    this.oscillator = audioCtx.createOscillator();
    this.oscillator.type = "sawtooth";
    this.oscillator.connect(audioCtx.destination);
  }

  playNote(frequency) {
    this.initializeOscillator();
    this.oscillator.frequency.value = frequency;
    this.oscillator.start();
  }

  incrementOctave() {
    this.setFrequency(2 * this.oscillator.frequency.value);
  }

  decrementOctave() {
    this.setFrequency(this.oscillator.frequency.value / 2);
  }

  setFrequency(frequency) {
    this.oscillator.frequency.value = frequency;
  }

  stop() {
    this.oscillator.stop();
  }
}

function App() {
  const oscillator = React.useRef(new Oscillator()).current;
  const [currentNote, setCurrentNote] = React.useState(null);
  const [playing, setPlaying] = React.useState(false);

  const handleStop = () => {
    oscillator.stop();
    setPlaying(false);
  };

  const handlePlayNote = (note) => () => {
    if (playing) {
      oscillator.setFrequency(guitarFrequencyMap[note]);
    } else {
      oscillator.playNote(guitarFrequencyMap[note]);
    }
    setCurrentNote(note);
    setPlaying(true);
  };

  const incrementOctave = () => {
    oscillator.incrementOctave();
  };

  const decrementOctave = () => {
    oscillator.decrementOctave();
  };

  return (
    <div className="App">
      <h1>Simple Guitar Ear Tuner</h1>
      <br />
      <br />
      <button className="btn btn-secondary" onClick={incrementOctave}>
        Increment Octave
      </button>
      <button className="btn btn-secondary" onClick={decrementOctave}>
        Decrement Octave
      </button>
      <br />
      <br />
      <hr />
      {notes.map((note) => {
        return note === currentNote && playing ? (
          <button className="btn" key={note} onClick={handleStop}>
            Stop
          </button>
        ) : (
          <button className="btn" key={note} onClick={handlePlayNote(note)}>
            Play note {note}
          </button>
        );
      })}
      <br />
      <div style={{ marginBottom: 20, marginRight: 20, marginLeft: "auto" }}>
        <GithubLink />
      </div>
    </div>
  );
}

const GithubLink = () => {
  return (
    <a
      href="https://github.com/intergalacticspacehighway/simple-guitar-ear-tuner/"
      target="_blank"
      rel="noreferrer"
      aria-label="github source code"
    >
      <svg height="32" viewBox="0 0 16 16" version="1.1" width="32">
        <path
          fill-rule="evenodd"
          d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
        ></path>
      </svg>
    </a>
  );
};

export default App;
