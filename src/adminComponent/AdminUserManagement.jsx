import React, {Component} from 'react';
import { Paper, Popover, Button, Typography, Divider, Grid, List, ListItem } from '@material-ui/core';
import {observer} from 'mobx-react'
import axios from'axios'
import axiosGetAllStudent from '../AxiosCall/axiosGetAllStudent';


class AdminUserManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // staffList: this.props.calendarStore.getStaffList
        }
    }


    componentDidUpdate() {
        console.log("setAdmin updated")
    }
        
    renderStaffList() {
        const {staffList} = this.props;
        return (
            <div style={{display: 'flex'}}>
            {staffList.map(staff => 
                <div style={{float: 'left', width: '20%', margin: '10px', }}>
                    <Paper variant="outlined" >
                        <List key={staff.id}>
                            <ListItem>
                                <Typography>Username:</Typography> &nbsp;
                                <Typography>{staff.username}</Typography>
                            </ListItem>
                        
                        
                            <ListItem>
                                <Typography>Email:</Typography> &nbsp;
                                <Typography>{staff.email}</Typography>
                            </ListItem>
                        
                            <ListItem>
                                <Typography>Full Name:</Typography> &nbsp;
                                <Typography>{staff.lname}  {staff.fname}</Typography>
                            </ListItem>
                            {staff.id === this.props.calendarStore.getUserData.id ?
                            <ListItem>
                                <Typography style={{fontStyle:'italic', fontSize:'15px'}}>Logged In User</Typography>
                            </ListItem>
                            :
                            <ListItem>
                                <Button onClick={() => this.resetPassword(staff.username)}>
                                   Reset Password
                                </Button>
                            </ListItem>
                            }
                        </List>
                    </Paper>        
                </div>
            
            )}
            </div>   
        )
    }

    renderStudentList() {
        const {studentList} = this.props;
        return (
            <div style={{display: 'flex'}}>
            {studentList.map(student => 
                <div style={{float: 'left', width: '20%', margin: '10px', }}>
                    <Paper variant="outlined" >
                        <List key={student.id}>
                            <ListItem>
                                <Typography>Username:</Typography> &nbsp;
                                <Typography>{student.username}</Typography>
                            </ListItem>
                        
                        
                            <ListItem>
                                <Typography>Email:</Typography> &nbsp;
                                <Typography>{student.email}</Typography>
                            </ListItem>
                        
                            <ListItem>
                                <Typography>Full Name:</Typography> &nbsp;
                                <Typography>{student.lname}  {student.fname}</Typography>
                            </ListItem>
                           
                            <ListItem>
                                <Button onClick={() => this.resetPassword(student.username)}>
                                   Reset Password
                                </Button>
                            </ListItem>

                            <ListItem>
                                <Button onClick={() => this.removeUser(student.username)}>
                                   Remove User
                                </Button>
                            </ListItem>
                           
                        </List>
                    </Paper>        
                </div>
            
            )}
            </div>   
        )
    }

    resetPassword = (username) => {
        if (window.confirm("Do you want to proceed? User password will be reset to default value")) {
            const token = localStorage.getItem('token');
            axios.put("http://localhost:8080/fyp/api/user/resetpwd/" + username, {
                password: 'ntuIsTheBest'
            },{
                headers: {
                    'Authorization' : "Bearer " + token
                }
            })
        }
    }

    removeUser = (username) => {
        const {calendarStore, updateStudentList} = this.props;
        if(window.confirm("Do you want to proceed? This user and all related data will be removed")) {
            const token = localStorage.getItem('token');
            axios.delete("http://localhost:8080/fyp/api/user/remove/" + username, {
                headers: {
                    'Authorization' : "Bearer " + token
                }
            }).then(
                calendarStore.removeUser(username)
            )

            updateStudentList()
        }
    }
    
    render() {
        
        return (
            <div>
                <Typography style={{fontSize:'40px', margin: '20px'}}>Staff</Typography>
                {this.renderStaffList()}

                <Typography style={{fontSize:'40px', margin: '20px'}}>Students</Typography>
                {this.renderStudentList()}
                
            </div>
        )
    }
}

export default observer(AdminUserManagement);