import React, {Component} from 'react';
import { observer } from 'mobx-react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Paper, Popover, Button, Typography, Divider, Grid, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from '@material-ui/core';
import axios from 'axios';

class AdminProjectView extends Component {

    constructor(props){
        super(props);
    }

    UNSAFE_componentWillMount() {
        const {calendarStore} = this.props;
        if (calendarStore.getProjectList.length === 0) {
            axios.get("http://localhost:8080/fyp/api/project/all", {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem("token")
                }
            }).then(res => {
                if (res.data._embedded != null) {
                    res.data._embedded.projectList.map( project => {
                        calendarStore.addProjectList({
                            id: project.id,
                            title: project.name,
                            student: project.student,
                            description: project.description,
                            staff: project.supervisor,
                        });
                    })
                }
            }

            )
        }
    }

    renderProjectList = () => {
        const {calendarStore} = this.props;
        var projectListing = calendarStore.getProjectList;

        return (
            <div>
                {projectListing.map(item => 
                    
                    <div>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                    <Typography>{item.title}</Typography></AccordionSummary>
                            <AccordionDetails>
                                <List>
                                    <ListItem>
                                        <Typography>{item.description}</Typography>
                                    </ListItem>

                                    <ListItem>
                                        <Typography>{item.staff.lname} {item.staff.fname}</Typography>
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

    render() {
        return (
            <div>
                {this.renderProjectList()}
            </div>
        )
    }
}

AdminProjectView = observer(AdminProjectView);
export default AdminProjectView;