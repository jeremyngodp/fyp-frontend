import React, {Component} from 'react';
import AdminProjectView from './AdminProjectView';
import AdminSetAdmin from './AdminSetAdmin';
import AdminSetSemester from './AdminSetSemester';
import AdminUserManagement from './AdminUserManagement';
import AdminToolBar from './AdminToolBar';
import { Paper, Popover, Button, Typography, Divider, Grid } from '@material-ui/core';
import axios from 'axios'
import axiosGetAllStaff from '../AxiosCall/axiosGetAllStaff';
import axiosGetAllStudent from '../AxiosCall/axiosGetAllStudent';
import { rest } from 'lodash';
import {observer} from 'mobx-react';

class AdminMainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPanel: "",
            staffList: this.props.calendarStore.getStaffList,
            studentList: this.props.calendarStore.getStudentList,
            projectList: this.props.calendarStore.getProjectList,
        }
    }

    UNSAFE_componentWillMount() {
        const {calendarStore} = this.props;
        if (!calendarStore.getLoadState) {
            axiosGetAllStudent(calendarStore)
            axios.get("http://localhost:8080/fyp/api/project/all", {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem("token"),
                }
            }).then(res => {
                if (res.data._embedded != null) {
                    res.data._embedded.projectList.map( project => {
                        calendarStore.addProjectList({
                            id: project.id,
                            title: project.name,
                            student: project.student,
                            description: project.description,
                            supervisor: project.supervisor,
                            tasks: project.taskList,
                        });
                    })
                }
            })

            axiosGetAllStaff(calendarStore);
            calendarStore.setLoadState(true)
        }
    }

    updateStaffList = () => {
        this.setState({
            staffList: this.props.calendarStore.getStaffList,
        })
    }

    updateStudentList = () => {
        this.setState({
            studentList: this.props.calendarStore.getStudentList,
        })
    }
    
    updateProjectList = () => {
        this.setState({
            projectList: this.props.calendarStore.getProjectList,
        })
    }

    componentDidUpdate() {
        console.log("Mainpage updated")
        console.log(this.state.staffList)
    }
    decideView = () => {
        switch(this.state.currentPanel) {
            case 'setSem':
                return <AdminSetSemester />;

            case 'userMgt':
                return <AdminUserManagement calendarStore={this.props.calendarStore} staffList={this.state.staffList} studentList={this.state.studentList} updateStudentList={this.updateStudentList} />;
                
            case 'setAdmin':
                return <AdminSetAdmin calendarStore={this.props.calendarStore} updateStaffList={this.updateStaffList} staffList={this.state.staffList}/>;
                
            default: 
                return <AdminProjectView calendarStore={this.props.calendarStore} updateProjectList={this.updateProjectList} projectList={this.state.projectList} />;
                
        }
    }

    handleClick = (e) => {
        console.log(e.currentTarget.value);
        this.setState({
            currentPanel :  e.currentTarget.value
        })
    }

    
    render() {
        console.log('mainpage render')
        return (
            <div>
                <AdminToolBar handleClick={this.handleClick} calendarStore={this.props.calendarStore}/>
                {this.decideView()}
            </div>
        )
    }
}

export default observer(AdminMainPage);