import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';


import AdminMainPage from './adminComponent/AdminMainPage'
import StudentPage from './Calendar/StudentComponent/StudentPage.jsx';
import StaffPage from './Calendar/StaffComponent/StaffPage.jsx';
import CalendarStore from './mobx/CalendarStore.js';
import ContentRouting from './TaskViewComponent/StudentTaskView/contentRouting.jsx';
import {AdminOnlyRoute, StudentOnlyRoute, StaffOnlyRoute, PrivateRoute, LoginRoute, CheckSwitchRoute, RegisterRoute} from './SpecialRoutes';
import ProjectListPage from './TaskViewComponent/StaffTaskView/projectListing.jsx';
import LoginPage from "./LoginComponent/LoginPage";
import RegisterPage from "./LoginComponent/RegisterUser";
import MyInfo from './Calendar/MyInfo';




const calendarStore = new CalendarStore();
                     
function App() {
    const studentOnlyRoute = ({ match }) => {
        return (
            <React.Fragment>
                <Router >
                    <Switch>
                        <Redirect exact from={`${match.url}`} to={`${match.url}/calendar`} />
                        
                        <Route
                            path={`${match.url}/calendar`} exact={true}
                            render={(props) => (<StudentPage {...props} calendarStore={calendarStore} />)}  // Student Page will include Reusable Calendar and Nav and sidebar
                        />
                    </Switch>
                </Router>
            </React.Fragment>
        );
      }

    const staffOnlyRoute = ({ match }) => {
        return (
            <React.Fragment>
                <Router >
                    <Switch>
                        <Redirect exact from={`${match.url}`} to={`${match.url}/calendar`} />
                        
                        <Route
                            path={`${match.url}/calendar`} exact={true}
                            render={(props) => (<StaffPage {...props} calendarStore={calendarStore} />)} // Staff Page will include Reusable Calendar and Nav and sidebar
                        />
                         
                        <Route
                            path={`${match.url}/projectlistings`} exact={true}
                            render={(props) => (<ProjectListPage {...props}  calendarStore={calendarStore} />)}
                        />

                        <Route
                            path={`${match.url}/userinfo`} exact={true}
                            render={(props) => (<MyInfo {...props}  calendarStore={calendarStore} />)}
                        />
                    </Switch>
                </Router>
            </React.Fragment>
        );
      }
     
    const Home = ({ match }) => {

        return (
            <React.Fragment>
                <Router>
                    <Switch>
                        <Redirect exact from={`${match.url}`} to={`${match.url}login`} />
                        <LoginRoute path={`${match.url}login`} exact component={LoginPage} calendarStore={calendarStore} 
                        /> 
                        
                    </Switch>
                </Router>
            </React.Fragment>
        );
    }

    const Admin = () => {

        return (
            <React.Fragment>
                <Router>
                    <Switch>
                        <AdminMainPage calendarStore={calendarStore} />
                    </Switch>
                </Router>
            </React.Fragment>
        );
    }

    
    return (
        <div>
            
            <Switch>

                <AdminOnlyRoute path="/admin" component={Admin} calendarStore={calendarStore}/>

                <RegisterRoute path="/register" component={RegisterPage} />
                
                <StudentOnlyRoute  path="/student" component={studentOnlyRoute} calendarStore={calendarStore} />
                
                <StaffOnlyRoute path="/staff" component={staffOnlyRoute} calendarStore={calendarStore} />

                <PrivateRoute  path="/:username/content" component={ContentRouting} calendarStore={calendarStore} />

                <CheckSwitchRoute path='/determiner' calendarStore={calendarStore} />

                <Route path='/' component={Home} calendarStore={calendarStore} />        
            </Switch>
        </div>
      );  
}

export default App;