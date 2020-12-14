import axios from 'axios';

//axios post creates a new task
/**
 * For axiosPost, if "weekly report", taskCreatedDate === taskDueDate
 * Else if "meetings", taskCreatedDate = start timing of meeting and end timing
 */
export default function axiosAddProject(project_title, student_id, project_description, calendaStore) {
    const token = localStorage.getItem("token");
    const staff_id =  calendaStore.getUserData.id
    if(token) {
        axios.post('http://localhost:8080/fyp/api/project/add', {
            name: project_title,
            description: project_description,  
            supervisor_id: staff_id,
            student_id: student_id    
        }, 
        {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            console.log(response);
            calendaStore.addProjectList({
                id: response.data.id,
                title: response.data.name,
                student: response.data.student,
                tasks: response.data.taskList,
            });
        }).catch((error) => {
                console.log("Not Successfull")
                console.log(error.response);
                console.log(error.request);
        })
    }
}

