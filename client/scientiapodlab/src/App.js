import logo from "./logo.svg";
import "./App.css";
import React from "react";

function App() {
  //! Reusable Components
  // card - //TODO: episodeCard (think of the design)

  //! Material UI Components
  // Select
  // Slider (?????)
  // Text Field
  // Typography
  // Skeleton
  // Accordion
  // AppBar
  // Stepper
  // Tabs
  // Modal
  // Text-Area

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
