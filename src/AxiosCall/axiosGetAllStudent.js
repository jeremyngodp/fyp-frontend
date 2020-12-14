import axios from 'axios';

export default function axiosGetAllStudent(calendarStore) {
    
    const token = localStorage.getItem("token");
    
    if(token){
        axios.get("http://localhost:8080/fyp/api/user/all", {headers: {
            'Authorization' : 'Bearer ' + token
        }}).then(response => {
            var studentList =  response.data._embedded.userList.filter(user => user.is_staff === false);
            studentList.map(student => {
                calendarStore.addStudentList({
                    id: student.id,
                    email: student.email,
                    fullName: student.fname + ' ' + student.lname,
                    username: student.username
                })
            })
            
            
        });
    }
}