import React, { useState } from 'react';
import { Link, Route } from "react-router-dom";
import AuthApiService from '../Services/auth-api-service';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from './Header';


const LoginForm = (props) => {
  const classes = useStyles();

  let usernameInput = React.createRef()
  let passwordInput = React.createRef()

  const [error, setError] = useState(null);

  const handleSubmitJwtAuth = (e) => {
    e.preventDefault()

    AuthApiService.postLogin({
      username: usernameInput.current.value,
      password: passwordInput.current.value,
    })
      .then(user => {
        usernameInput.current.value = ''
        passwordInput.current.value = ''
        // props.onLoginSuccess()
        handleLoginSuccess()
      })
      .catch(res => {
        setError(res.error);
      })
    }

    const handleLoginSuccess = () => {
      const { history } = props
      history.push('/spells')
      // if(props.onLogin){
      //   props.onLogin(true);
      // }
    }

    return (
    <>
      <Route
        path={'/'}
        component={Header}
      />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              inputRef={usernameInput}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={passwordInput}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <div role='alert'>
              {error ? <p className='red'>{error}</p> : null}
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => handleSubmitJwtAuth(e)}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link to={'/signup'} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  )
};

LoginForm.defaultProps = {
  location: {},
  history: {
    push: () => {},
  },
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default LoginForm;