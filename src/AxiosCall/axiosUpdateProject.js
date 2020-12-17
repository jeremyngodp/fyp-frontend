import axios from 'axios';

//axios post creates a new task
/**
 * For axiosPost, if "weekly report", taskCreatedDate === taskDueDate
 * Else if "meetings", taskCreatedDate = start timing of meeting and end timing
 */
export default function axiosUpdateProject(project_id, project_title, student_id, project_description, calendaStore, student) {
    const token = localStorage.getItem("token");
    const staff_id =  calendaStore.getUserData.id;
    const {updateProject} = calendaStore; 
    if(token) {
        axios.put('http://localhost:8080/fyp/api/project/' + project_id, {
            id: project_id,
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
            updateProject(project_id, project_title, student, project_description);
        }).catch((error) => {
                console.log("Not Successfull")
                console.log(error.response);
                console.log(error.request);
        })
    }
}

