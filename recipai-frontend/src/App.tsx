import './App.css';

import { useState, useEffect } from 'react';
import PromptScreen from './screens/PromptScreen'
import MainHeader from './components/MainHeader';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

const classes = {
  container: {
    width: "100%",
    padding: "2%"
  },
  element: {
    width: "100%",
  }
}


function App() {


  const [practiceData, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));

  }, []);

  return (
    <>
      <Grid2 container direction={"column"} sx={classes.container}>
        <Grid2 sx={classes.element}>
          <MainHeader />
        </Grid2>
        <Grid2 sx={classes.element}>
          <PromptScreen />
        </Grid2>
      </Grid2>

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
