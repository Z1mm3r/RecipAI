import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from 'react';
import PromptScreen from './screens/PromptScreen'
import MainHeader from './components/MainHeader';

function App() {


  const [practiceData, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));

  }, []);

  return (
    <>
      <MainHeader />
      <PromptScreen />
    </>
  )

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         {!practiceData ? "Loading..." : practiceData}
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
