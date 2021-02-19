import React, { useState, useCallback, useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import axios from 'axios';
import { observer } from 'mobx-react';
import { Dialog, Modal, Typography, Paper } from "@material-ui/core";

import ReportSubmissionPage from './ReportSubmissionPage';
import TaskEditForm from './TaskEditForm';

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
    width: "32.5vw",
    height: "80vh",
    margin: "0 auto",
    backgroundColor: "#2e4da3"
  },
  columnHead: {
    textAlign: "center",
    padding: 10,
    fontSize: "1.2em",
    backgroundColor: "#C6D8AF"
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


function Kanban ({calendarStore, onSubmitEditTask}) {
    const taskList = calendarStore.getData.filter(task => task.event_type === "common");
    console.log(taskList);
    const [tasks, setTaskStatus] = useState(taskList);
    const [open, setOpen] = useState(false);
    const [currentItem, setItem] = useState('');

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        let newTasks = calendarStore.getData.filter(task => task.event_type === "common");
        setTaskStatus(newTasks);
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
                    <TaskEditForm item={currentItem} calendarStore={calendarStore} handleClose={handleClose} onSubmitEditTask={onSubmitEditTask}/>
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
                                <div key={item.id} onClick={() => {handleClickTask(item)}} >
                                    <Paper >
                                    <KanbanItem id={item.id} >
                                        <div style={classes.item}>{item.title}</div>
                                    </KanbanItem>
                                    </Paper>
                                </div>
                            )})}
                            {renderTaskModal()}
                        </div>
                    </div>
                    </KanbanColumn>
                ))}
                </section>
            </DndProvider>
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