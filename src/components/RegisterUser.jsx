import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import history from '../history';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import * as actions from '../redux/login-store/actions/authActions';
import { MenuItem, Radio, Select } from '@material-ui/core';

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

class RegisterUser extends Component {

    constructor(props){
      super(props);
      this.state = {
        username: "",
        password: "",
        cpassword: "",
        email: "",
        lname:"",
        fname: "",
        is_staff: false,
        isAuthenticated: false,
        error:"",
      }
        
        this.userList=[];
        
    }  
    
    UNSAFE_componentWillMount() {
        axios.get("http://localhost:8080/fyp/api/user/all").then(response => {
            response.data._embedded.userList.map(user =>{
                this.userList.push({
                    username: user.username,
                    email: user.email
                })
            })
        })
    }

    handleRegister = (e) => {
        e.preventDefault();
        const { username, password, cpassword, email, lname, fname, is_staff } = this.state;
        if (username === "" || password === "" || email=== ""
            || lname === "" || fname === "") {
                this.setState({error: "Please fill in the required information"});
        
        } else {
            if(this.userList.find(user => user.username === username)){
                this.setState({error: "The username has been taken! Please find another username"});
            }

            else if (this.userList.find(user => user.email === email)){
                this.setState({error: "This is email has already been used for another account! Please use a different email"});
            }

            else {
                if(cpassword === password){
                    axios.post("http://localhost:8080/fyp/api/user/add", {
                        username: username,
                        password: password,
                        email: email,
                        lname: lname,
                        fname: fname,
                        is_staff: is_staff
                    })
                    alert("Registration successful!");
                    history.pushState("/login");
                }

                else {
                    this.setState({
                        error: "Password and Confirm Password does not match"
                    });
                }
            }   
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
            error: "",
            [e.target.name]: value
        })
    }

    render() {
        const { username, password,cpassword, lname, fname, email, is_staff } = this.state;
        const { classes } = this.props;
        let errorMessage = null;
        if (this.state.error) {
            errorMessage = (
            <p className={classes.errorMsg} >{this.state.error}</p>
            //   <p className={classes.errorMsg}>Incorrect username or password. Please try again.</p>
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
                    <PersonAddIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Registration
                </Typography>
                <form className={classes.form} noValidate onSubmit={this.handleRegister} method="POST">
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
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="cpassword"
                        label="Confirm Password"
                        type="password"
                        id="cpassword"
                        
                        value= {cpassword}
                        onChange={this.handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="email"
                        label="Email"
                        type="text"
                        id="email"
                        autoComplete="email"
                        value= {email}
                        onChange={this.handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="lname"
                        label="Last Name"
                        type="lname"
                        id="lastname"
                        autoComplete="current-lastname"
                        value= {lname}
                        onChange={this.handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="fname"
                        label="First Name"
                        type="fname"
                        id="firstname"
                        autoComplete="current-firstname"
                        value= {fname}
                        onChange={this.handleChange}
                    />

                    <Typography>User Type</Typography>
                    <Select
                        id="select-user-type"
                        name='is_staff'
                        value={is_staff}
                        onChange={this.handleChange}
                    >
                        <MenuItem value="true">Staff</MenuItem>
                        <MenuItem value="false">Student</MenuItem>
                    </Select>
                    
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
                        Register
                    </Button>
                    
                    <Grid container>
                        <Grid item>
                            <Link href="http://localhost:3000/login" variant="body2">
                                {"Already have an account? Sign In"}
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

const RegisterPage = withStyles(useStyles)(RegisterUser);
export default connect(mapStateToProps, mapDispatchToProps) (RegisterPage);
