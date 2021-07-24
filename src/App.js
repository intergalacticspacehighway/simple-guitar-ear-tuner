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
    </div>
  );
}

export default App;
