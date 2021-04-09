import React, {Component} from 'react';
import { Paper, Popover, Button, Typography, Divider, Grid, List, ListItem } from '@material-ui/core';
import {observer} from 'mobx-react'
import axios from'axios'


class AdminSetAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // staffList: this.props.calendarStore.getStaffList
        }
    }
    
    // updateStaffList() {
    //     console.log("running")
    //     const {calendarStore} = this.props;
    //     this.setState({
    //         staffList: this.props.calendarStore.getStaffList,
    //     }) 
    // }

    changeAdminStatus(username) {
        const {calendarStore, updateStaffList} = this.props;
        const token = localStorage.getItem("token")
        
        var proceed = window.confirm("This action will change the user's privlige in the system. Do you want to proceed?");

        if (proceed) {
            
            axios.put("http://localhost:8080/fyp/api/user/" + username, {
                dummyData: 'data' //should i use get instead since there is no data for this request?
            },{
                headers: {
                    'Authorization' : "Bearer " + token
                }
            })
            .then(res => {
                if(res.data != null) {
                    console.log(res.data.is_admin);
                    calendarStore.updateStaffList(res.data.id, res.data.is_admin);
                }
            })    
        }

        updateStaffList();          
    }

    componentDidUpdate() {
        console.log("setAdmin updated")
    }
        
    renderStaffList() {
        const {staffList} = this.props;
        console.log(staffList)
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
                                <Button onClick={() => this.changeAdminStatus(staff.username)}>
                                {staff.isAdmin === true?
                                    "Revoke Admin Privilege"
                                    :
                                    "Make Admin"
                                }
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
    
    render() {
        
        return (
            <div>
                {
                   this.renderStaffList()
                }
                
            </div>
        )
    }
}

export default observer(AdminSetAdmin);