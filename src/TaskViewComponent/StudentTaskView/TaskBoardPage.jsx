import React, { Component } from 'react';
import { Paper, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Kanban from './TaskBoard';



const useStyles = (theme) => ({
    root: {
      width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(25),
        fontWeight: 'bold',
        textAlign: 'center'
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    details: {
      float: 'center',
    },
    column: {
      flexBasis: '50%',
      padding: '0 30px',
    }
  })

const TaskBoardPage = observer(
    class TaskBoardPageClass extends Component {
        constructor(props) {
            super(props);
         
        }

        renderTaskBoard() {
            const {calendarStore, classes, onSubmitEditTask} = this.props;
            const taskList = calendarStore.getData.filter(task => task.event_type === "common");
            console.log(taskList);
            return (
                <Kanban taskList={taskList} calendarStore={calendarStore} className={classes.column} onSubmitEditTask={onSubmitEditTask}/>
            )
        }

        componentDidUpdate() {
            console.log("Task Board Page updated")
        }
        
        render() {
            const {classes} = this.props
            return (
                <div style={{ width: '100%' }}>
                    <div>
                        <Paper>
                            <Paper style={{ position: "sticky", top: '4.5rem', height: '50px', zIndex: '2' }}>
                                <Typography className={classes.heading}>Tasks Board</Typography>
                            </Paper>
                            {this.renderTaskBoard()}
                            
                        </Paper>
                    </div>
                    <Paper>
                    </Paper>
                </div>
            )
        }
    }

)

export default withStyles(useStyles) (TaskBoardPage);