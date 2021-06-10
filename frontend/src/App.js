import './App.css';
import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from "react-router-dom";
import { createBrowserHistory } from 'history';
import {Helmet} from "react-helmet";
import AuthApiService from './Services/auth-api-service';
// import IdleService from './Services/idle-service';
import TokenService from './Services/token-service';
import LoginForm from './Components/LoginForm';
import SignupForm from './Components/SignupForm';
import LandingPage from './Components/LandingPage';
import SpellIndex from './Components/Dashboard/SpellIndex';
import { ThemeProvider, createMuiTheme, CssBaseline } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import SpellDetails from './Components/Dashboard/SpellDetails';
import Dashboard from './Components/Dashboard/Dashboard';
import PublicSpells from './Components/PublicSpells';
import UserProfile from './Components/UserProfile';
import NotFound from './Components/NotFound';
import SpellsApiService from './Services/spells-api-service';
import Downloads from './Components/Dashboard/Downloads';
import Follows from './Components/Dashboard/Follows';
import Docs from './Components/Docs/Docs';
import FabAddIcon from './Components/Dashboard/FabAddIcon';

require('codemirror/mode/scheme/scheme');


function App() {
  const paper = outerPaper();
  let history = useHistory();

  const [isLoggedIn, setIsLoggedIn] = useState(undefined);
  const [darkMode, setDarkMode] = useState(false)

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark'
    }
  }); 

  const lightTheme = createMuiTheme({})

  useEffect(() => {
    let isMounted = true
    // Only running this to check if logged in
    SpellsApiService.getUserById('me')
      .then((user) => setIsLoggedIn(true))
      .catch(() => setIsLoggedIn(false))

    return () => {
      isMounted = false
    }
  }, [])

  let path = window.location.pathname

  return ( 
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className="App">
        <Helmet>
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-J6N2NMKYC9"></script>
          <script>
            {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-J6N2NMKYC9');`}
          </script>
        </Helmet>
        <div >
          <Dashboard
            isLoggedIn={isLoggedIn} 
            setIsLoggedIn={setIsLoggedIn}
            setDarkMode={setDarkMode}
            darkMode={darkMode}
            child={
              <Switch>
                <Route
                  exact path={'/'}
                  component={(props) => <LandingPage darkMode={darkMode} setDarkMode={setDarkMode} isLoggedIn={isLoggedIn}></LandingPage >}
                />
                <Route
                  exact path={'/panel.html'}
                  component={(props) => <LandingPage isLoggedIn={isLoggedIn}></LandingPage>}
                />
                <Route
                  exact path={'/signup'}
                  component={SignupForm}
                />
                <Route
                  exact path={'/login'}
                  component={LoginForm}
                />
                <Route
                  path={'/spells/:id'}
                  component={(props) => <SpellDetails/>}
                />
                <Route
                  exact path={'/spells'}
                  component={(props) => <SpellIndex isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} darkMode={darkMode} />}
                />
                <Route
                  exact path={'/follows'}
                  component={(props) => <Follows darkMode={darkMode} />}
                />
                <Route
                  exact path={'/gallery'}
                  component={(props) => <PublicSpells darkMode={darkMode}/>}
                />
                <Route
                  path={'/wizards/:id'}
                  component={(props) => <UserProfile darkMode={darkMode} match={props.match}/>}
                />
                <Route
                  path={'/docs/:page'}
                  component={(props) => <Docs match={props.match} />}
                />
                <Route
                  path={'/docs'}
                  component={(props) => <Docs darkMode={darkMode} match={{params: {page: "docs"}}} />}
                />
                <Route
                  exact path={'/downloads'}
                  component={(props) => <Downloads darkMode={darkMode}/>}
                />
                <Route
                  component={(props) => <NotFound/>}
                />
              </Switch>
            }
          >
          </Dashboard>
        </div>
      </div>
    </ThemeProvider>
  );
}

const outerPaper = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(2),
      width: theme.spacing(50),
      height: theme.spacing(50),
    },
  },
}));

export default App;


