import './App.css';
import { userLogin } from '@customTypes/userLogin';

import { useState, useEffect } from 'react';
import PromptScreen from '@screens/PromptScreen'
import MainHeader from '@components/MainHeader';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { ThemeProvider } from '@mui/material/styles';
import { themeOptions } from '@components/CustomTheme';

import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './screens/ErrorPage';
import LoginScreen from './screens/LoginScreen';



const classes = {
  container: {
    width: "100%",
    height: "100vh",
  },
  header: {
    height: "10%"
  },
  page: {
    width: "100%",
    height: "10%"
  }
}


function App() {


  const [userLogin, setUserLogin] = useState<userLogin>({ loggedIn: false, userInfo: null });

  return (
    <ThemeProvider theme={themeOptions}>
      <Grid2 container direction={"column"} sx={classes.container}>
        <Grid2 xs={12} sx={classes.header}>
          <MainHeader userInfo={userLogin} />
        </Grid2>
        <Grid2 sx={classes.page}>
          <Outlet />
        </Grid2>
      </Grid2>
    </ThemeProvider>

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
