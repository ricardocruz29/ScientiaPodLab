import logo from "./logo.svg";
import "./App.css";

function App() {
  //! Example on how to use useAuth hook to handle authentication
  // const { authenticate, authError } = useAuth();
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await authenticate({ email, password }, false); // false for register
  // };

  //! Reusable Components
  // card - //TODO: audioCard (do wave sound first) - episodeCard (think of the design)
  // button - green - yellow - red - fillGreen //? DONE;
  // templateSequence - template //? DONE;
  // templateSequenceCard - //? DONE
  // Drag&Drop - MainPlaceholder - SecondaryPlaceholder - fullWidth
  // Play button - size //? DONE
  // Audio Wave
  // * All the other components are possible to do using Material UI Components

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
