import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';


import StudentPage from './Calendar/StudentPage.jsx'
import StaffPage from './Calendar/StaffPage.jsx'
import CalendarStore from './mobx/CalendarStore.js';
import ContentRouting from './components/contentRouting/contentRouting.jsx';
import {StudentOnlyRoute, StaffOnlyRoute, PrivateRoute} from './SpecialRoutes';


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
                         {/*
                         <Route
                            path={`${match.url}/projectlistings`} exact={true}
                            render={(props) => (<ProjectListPage {...props} calendarStore={calendarStore} />)}
                        /> */}
                    </Switch>
                </Router>
            </React.Fragment>
        );
      }
     
    const Home = ({ match }) => {

        return (

            <div>
                This is Home Page
            </div>
            // <React.Fragment>
            //     <Router>
            //         <Switch>
            //             {/* <Redirect exact from={`${match.url}`} to={`${match.url}login`} />
            //             <LoginRoute path={`${match.url}login`} exact component={LoginPage} calendarStore={calendarStore} 
            //             /> 
            //             */}
            //         </Switch>
            //     </Router>
            // </React.Fragment>
        );
      }

    
      return (
        <div>
            
                <Switch>
                    <PrivateRoute  path="/content" component={ContentRouting} calendarStore={calendarStore} 
                    />

                    <StudentOnlyRoute  path="/student" component={studentOnlyRoute} calendarStore={calendarStore}
                    />
                    
                    <StaffOnlyRoute path="/staff" component={staffOnlyRoute} calendarStore={calendarStore}
                    />
                    
                    <Route exact path='/' component={Home} calendarStore={calendarStore}
                    />

                    

                </Switch>
        </div>
      );  
}



export default App;
