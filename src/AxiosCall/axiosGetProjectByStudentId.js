import axios from 'axios';

export default function axiosGetProjectListByStudentId (student_id, calendarStore) {
    const token = localStorage.getItem("token")
    console.log(student_id);
    const URL_string  = "http://localhost:8080/fyp/api/project/bystu/"  + student_id;
    console.log(URL_string);
    axios.get(URL_string, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(res => {
        if (res.data._embedded != null) {
            // res.data._embedded.projectList.map( project => {
            //     calendarStore.addProjectList({
            //         id: project.id,
            //         title: project.name,
            //         student: project.student,
            //         tasks: project.taskList,
            //         supervisor: project.supervisor,
            //         description: project.description
            //     });

            //     project.taskList.map(task => {
            //         calendarStore.addData( {
            //             id: task.id,
            //             title: task.title,
            //             attachedFile: task.attachedFile,
            //             event_type: task.task_type,
            //             start: task.deadline,
            //             end: task.deadline,
            //             project_id : project.id,
            //             hour: task.hourSpent,
            //             comments: task.comments,
            //             student_id: task.student_id,
            //             status: task.status,

            //         })
            //     })
            // })
        localStorage.setItem("projects", JSON.stringify(res.data._embedded.projectList))   
        }
    }).catch(err => {
        console.log(err);
    }) 
}