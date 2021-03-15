import { observable, action, computed, makeObservable } from "mobx"
/*
newData is an array containing all the tasks for a Student user
    Element structure: 
    {Id: id of the task
    title: title of task
    event_type: type of task (meeting, report, submission)
    start: deadline of task
    end: deadline of task
    project_id: id of the project that the task belong to
    comments: comments related to the tasks
    attachedFile: attached file to the task
    student_id: id of student}

projectList is an array containing all the project for a Staff user
    Element structure: {
        id: id of the project
        title: title of the project
        description: description of the project
        student: list of students doing the project -> {id, fname, lname, email, is_staff}
        tasks: list of task related to the project -> {id, project_id, student_id, title, created_date, deadline, task_type, comments}
    }

studentList is an array containing all Student user information for Staff user to assign to Project
    Element structure: {
        id: student.id,
        email: student.email,
        fullName: student.fname + ' ' + student.lname,
        username: student.username
    }
*/
class CalendarStore {
    newData = []
    userData = ''
    userType = ''
    defaultState = {state:'Tasks', index:0}
    semStart = '2021-01-11'
    projectList = []
    studentList = []

    constructor() {
        makeObservable(this, {
            newData: observable,
            userData: observable,
            userType: observable,
            defaultState: observable,
            semStart: observable,
            projectList: observable,
            studentList: observable,

            getData: computed,
            getUserType: computed,
            getDefaultState: computed,
            getProjectList:computed,
            getStudentList: computed,

            addData: action,
            addProjectList: action,
            addStudentList: action,
            addUserType: action,
            changeDefaultState: action,
            setUserData: action,
            updateProject: action,
            updateTask: action,
            resetStore: action,
        })
    }

    get getData() {
        return this.newData;
    }

    get getProjectList () {
        return this.projectList;
    }

    get getStudentList () {
        return this.studentList;
    }

    get getUserData() {
        return this.userData;
    }

    get getUserType() {
        return this.userType;
    } 

    get getDefaultState() {
        return this.defaultState;
    }

    addData(e) {
        this.newData.push(e);
    }

    addProjectList (e) {
        this.projectList.push(e);
    }

    addStudentList (e) {
        this.studentList.push(e);
    }

    addUserType = (e) => {
        this.userType = e;
    }

    changeDefaultState = (e) => {
        this.defaultState = e;
    }

    setUserData = (userData) => {
        this.userData = userData;
    }

    updateProject = (project_id, title, student, description) => {
        var found = this.projectList.find((element) => element.id == project_id);
        found.student = student;
        found.title = title;
        found.description = description;

        console.log(this.projectList)
    }

    updateTask = (task_id, hour, status, attachedFile) => {
        var found = this.newData.find(task => task.id == task_id);
        found.status = status;
        found.hour = hour;
    }

    updateAttachedFile = (task_id, attachedFile) => {
        var found = this.newData.find(task => task.id == task_id);
        found.attachedFile = attachedFile;
    }

    resetStore = () => {
        this.newData = [];
        this.userData = "";
        this.defaultState = {state:'Reports', index:0};
        this.semStart = '2020-08-09';
        this.projectList = [];
        this.studentList = [];
    }
    
}    
export default CalendarStore;

