import React, {Component} from 'react';
import { observer } from 'mobx-react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Paper, Popover, Button, Typography, Divider, Grid, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from '@material-ui/core';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DescriptionIcon from '@material-ui/icons/Description';
import axios from 'axios';
import {withStyles} from '@material-ui/core/styles'
import { Delete } from '@material-ui/icons';


const useStyles = (theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: 'bold',
    },
    
    itemName: {
        fontWeight: 'bold',
        fontSize: theme.typography.pxToRem(15),
        
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
})

class AdminProjectView extends Component {

    constructor(props){
        super(props);
    }

    renderProjectList = () => {
        const {calendarStore, classes, projectList} = this.props;
        

        return (
            <div>
                {projectList.map(item => 
                    
                    <div>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                    <Typography className={classes.heading}>{item.title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List>
                                    <ListItem>
                                        <DescriptionIcon/> &nbsp;
                                        <Typography className={classes.itemName}>Description:</Typography> &nbsp;
                                        <Typography>{item.description}</Typography>
                                    </ListItem>

                                    <ListItem>
                                        <SupervisorAccountIcon/> &nbsp;
                                        <Typography className={classes.itemName}>Supervisor:</Typography> &nbsp;
                                        <Typography>{item.staff.fname} {item.staff.lname}</Typography>
                                    </ListItem>
                                    {item.student == null? 
                                    <ListItem>
                                        <AccountCircleIcon/> &nbsp;
                                        <Typography className={classes.itemName}>Assigned Student:</Typography> &nbsp;
                                        <Typography> No student is assigned to this project</Typography>
                                    </ListItem>
                                    :
                                    <ListItem>
                                        <AccountCircleIcon/> &nbsp;
                                        <Typography className={classes.itemName}>Assigned Student:</Typography> &nbsp;
                                        <Typography>{item.student.fname} {item.student.lname}</Typography>
                                    </ListItem>

                                    }

                                    <ListItem>
                                        <Button color='secondary' onClick={() => this.removeProject(item.id)}>
                                        <Delete/> &nbsp;
                                        <Typography>Remove Project</Typography>
                                        </Button>
                                    </ListItem>
                                    
                                </List>
                            </AccordionDetails>
                        </Accordion>
                        {/* add function to remove project */}
                    </div>
                    
                )}
            </div>
        )
    }

    removeProject = (id) => {
        const {calendarStore, updateProjectList} = this.props
        if(window.confirm('Deleting this project will remove all of its related data such as tasks and uploaded files. Do you want to proceed?')) {
            axios.delete("http://localhost:8080/fyp/api/project/delete/" + id, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(
                calendarStore.removeProject(id)
            )

            updateProjectList();
            
        }
    }

    render() {
        return (
            <div>
                {this.renderProjectList()}
            </div>
        )
    }
}

AdminProjectView = observer(AdminProjectView);
export default withStyles(useStyles) (AdminProjectView);