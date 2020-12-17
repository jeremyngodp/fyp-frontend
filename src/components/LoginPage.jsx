import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import * as actions from '../redux/login-store/actions/authActions';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        NTU Project Management Platform
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = (theme) => ({
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
  root: {
    marginTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  errorMsg: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    width: '20%',
    margin: '0 auto',
    marginTop: '10px',
    // alignItem: 'center'
  },
})

class Login extends Component {

    constructor(props){
      super(props);
      this.state = {
        username: "",
        password: "",
        isAuthenticated: false,
      }
    }  
        
    handleLogin = (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        if (username === "" || password === "" ) {
          alert("Please fill in your username/password");
        
        } else {
          this.props.onAuth(username, password);
        }
    }

    // handleLogout = (e) => {
    //   e.preventDefault();
    //   this.props.logout();
    // }

    handleChange = (e) => {
      const value = e.target.value;
      this.setState({
        ...this.state,
        [e.target.name]: value
      })
    }

    render() {
      const { username, password } = this.state;
      const { classes } = this.props;
      let errorMessage = null;
      if (this.props.error) {
          errorMessage = (
          // <p className={classes.errorMsg} >{this.props.error.message}</p>
          <p className={classes.errorMsg}>Incorrect username or password. Please try again.</p>
          );
      }

      return (
        <div>
        {errorMessage}
        {
          this.props.loading ?
          
          <div className={classes.root}>
            <CircularProgress />
          </div>

          :
          
          <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
              <Avatar className={classes.avatar} style={{margin: 'auto'}}>
              <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
              Sign in
              </Typography>
              <form className={classes.form} noValidate onSubmit={this.handleLogin} method="POST">
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={this.handleChange}
                  autoFocus
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
                  value= {password}
                  onChange={this.handleChange}
              />
              {/* <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
              /> */}
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
              >
                  Sign In
              </Button>
              
              <Grid container>
                  <Grid item xs>
                  <Link href="#" variant="body2">
                      Forgot password?
                  </Link>
                  </Grid>
                  <Grid item>
                  <Link href="http://localhost:3000/register" variant="body2">
                      {"Don't have an account? Sign Up"}
                  </Link>
                  </Grid>
              </Grid> 
             
              </form>
            {/* <form className={classes.form} noValidate onSubmit={this.handleLogout} method="POST">

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Logout
              </Button>
            </form> */}
          </div>
          <Box mt={8}>
              <Copyright />
          </Box>
          </Container>

          }
        </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
      loading: state.loading,
      error: state.error,
      // token: state.token,
      // user: state.user,
      // projects: state.projects
  }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password)),
        // logout: () => dispatch(actions.logout()),
    }
}

// function mapDispatchToProps(dispatch){
//   return {
//     authLogin: (username, password) => dispatch(actions.authLogin(userInfo))
//   }
// }

const LoginForm = withStyles(useStyles)(Login);
export default connect(mapStateToProps, mapDispatchToProps) (LoginForm);
