import React, { useState, useCallback, useRef, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import axios from 'axios';
import { observer } from 'mobx-react';
import { Dialog, Modal, Typography, Paper, Accordion, AccordionDetails, AccordionSummary } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReportSubmissionPage from './ReportSubmissionPage';
import TaskEditForm from './TaskEditForm';
import TaskEditFormCopy from './TaskEditFormCopy';
import ReusableCommentBox from "./ReusableCommentComponent/ReusableCommentBox";
import TaskSubmissionPage from "./TaskSubmissionPage";
import { PlayCircleFilledWhite } from "@material-ui/icons";

const channels = [ "new", "wip", "done"];
const labelsMap = {
  
  new: "To Do",
  wip: "In Progress",
  done: "Done"
};

const classes = {
  board: {
    display: "flex",
    margin: "0",
    width: "90wh",
    fontFamily: 'Arial, "Helvetica Neue", sans-serif'
  },
  column: {
    minWidth: 200,
    width: "32.48vw",
    height: "80vh",
    margin: "0 auto",
    backgroundColor: "gainsboro"
  },
  columnHead: {
    textAlign: "center",
    color: "white",
    padding: 10,
    fontSize: "1.2em",
    backgroundColor: "#393db5"
  },
  item: {
    padding: 10,
    margin: 10,
    fontSize: "0.8em",
    cursor: "pointer",
    backgroundColor: "white"
  },

  modal: {
    width: 400,
    height:400,
  }
};


function Kanban ({taskList, calendarStore, onSubmitEditTask}) {
    const newtaskList = calendarStore.getData.filter(task => task.event_type === "common");
    console.log(taskList);
    const [tasks, setTaskStatus] = useState(taskList);
    const [open, setOpen] = useState(false);
    const [currentItem, setItem] = useState('');
    
    useEffect(() => {
        if (tasks.length === 0){
            setTaskStatus(calendarStore.getData.filter(task => task.event_type === "common"));
        }
        console.log(calendarStore.getLoadState);
    })

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleTaskChange = () => {
        let newTasks = calendarStore.getData.filter(task => task.event_type === "common");
        setTaskStatus(newTasks);
    }

    const handleClose = () => {
        console.log(tasks);
        setOpen(false);
    };

    const handleClickTask = (item) => {
        setItem(item);
        handleOpen();
    }

    //update the database and the calendarStore here
    const changeTaskStatus = useCallback(
        (id, status) => {
            let task = tasks.find(item => item.id == id);
            calendarStore.updateTask(id, task.hour, status);
            console.log(task)
        // let task = tasks.find(task => task.id === id);
        // const taskIndex = tasks.indexOf(task);
        // task = { ...task, status };
        // let newTasks = update(tasks, {
        //     [taskIndex]: { $set: task }
        // });
            let newTasks = calendarStore.getData.filter(task => task.event_type === "common");
            setTaskStatus(newTasks);
            axios.put('http://localhost:8080/fyp/api/task/' + id,
            {   id: id,
                status: status,
                hourSpent: task.hour
            },
            {headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem("token")
            }});
        
        },
        [tasks]
    );

    const renderTaskModal = () => {
        return (
            <Dialog
                open={open}
                onClose={handleClose}
                backgroundColor ="white"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                    <div style={{width: '90%',margin: 'auto'}}>
                        <TaskSubmissionPage 
                            calendarStore={calendarStore} 
                            item={currentItem} 
                            id={currentItem.id} 
                            hourSpent={currentItem.hour} 
                            attachedFile={currentItem.attachedFile}
                            handleTaskChange = {handleTaskChange}
                            onSubmitEditTask = {onSubmitEditTask}
                        />
                    </div>

                    <div style={{width: '90%', margin: 'auto'}}>
                        <ReusableCommentBox
                            comments={currentItem.comments} 
                            calendarStore={calendarStore} 
                            task_id={currentItem.id} 
                            user_id={calendarStore.getUserData.id}
                        />
                    </div>
            </Dialog>
        )
    }

    return (
        <main>
            <DndProvider backend={HTML5Backend}>
                <section style={classes.board}>
                {channels.map(channel => (
                    <KanbanColumn
                    key={channel}
                    status={channel}
                    changeTaskStatus={changeTaskStatus}
                    >
                    <div style={classes.column}>
                        <div style={classes.columnHead}>{labelsMap[channel]}</div>
                        <div>
                        {tasks
                            .filter(item => item.status === channel)
                            .map(item => {
                                console.log(item)
                                return (
                                <div key={item.id} onClick={() => {handleClickTask(item)}} style={{margin: 'auto' ,width: "90%", alignItems: 'center'}} >
                                    <Paper >
                                        <KanbanItem id={item.id} >
                                            <div style={classes.item}>{item.title}</div>
                                            {/* <Accordion className= {classes.item} style={{ overflow: 'hidden' }}  >
                                                <AccordionSummary expandIcon={<ExpandMoreIcon/>} >
                                                    <div style={classes.item}>{item.title}</div>
                                                </AccordionSummary>
                                                <AccordionDetails >
                                                    <div>
                                                        <TaskEditFormCopy 
                                                            item={item} 
                                                            calendarStore={calendarStore} 
                                                            handleClose={handleClose} 
                                                            onSubmitEditTask={onSubmitEditTask}
                                                        />
                                                    </div>

                                                    <div>
                                                        <ReusableCommentBox
                                                            comments={item.comments} 
                                                            calendarStore={calendarStore} 
                                                            task_id={item.id} 
                                                            user_id={calendarStore.getUserData.id}
                                                        />
                                                    </div>
                                                </AccordionDetails>
                                            </Accordion> */}
                                        </KanbanItem>
                                    </Paper>
                                </div>
                            )})}
                            
                        </div>
                    </div>
                    </KanbanColumn>
                ))}

                </section>
            </DndProvider>
            {renderTaskModal(currentItem)}
        </main>
    );
};

export default observer(Kanban);

const KanbanColumn = ({ status, changeTaskStatus, children }) => {
    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: "card",
        drop(item) {
        changeTaskStatus(item.id, status);
        }
    });
    drop(ref);
    return <div ref={ref}> {children}</div>;
};

const KanbanItem = ({ id, children }) => {
    const ref = useRef(null);
    const [{ isDragging }, drag] = useDrag({
        item: { type: "card", id },
        collect: monitor => ({
        isDragging: monitor.isDragging()
        })
    });
    const opacity = isDragging ? 0 : 1;
    drag(ref);
    return (
        <div ref={ref} style={{ opacity }}>
        {children}
        </div>
    );
};