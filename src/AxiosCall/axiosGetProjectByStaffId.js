import axios from 'axios';

export default function axiosGetProjectListByStaffId (staff_id, calendarStore) {
    const token = localStorage.getItem("token")
    console.log(staff_id);
    const URL_string  = "http://localhost:8080/fyp/api/project/bysup/"  + staff_id;
    console.log(URL_string);
    axios.get(URL_string, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(res => {
        if (res.data._embedded != null) {
            res.data._embedded.projectList.map( project => {
                calendarStore.addProjectList({
                    id: project.id,
                    title: project.name,
                    student: project.student,
                    tasks: project.taskList,
                    description: project.description
                });
            })
        }
    }).catch(err => {
        console.log(err);
    }) 
}