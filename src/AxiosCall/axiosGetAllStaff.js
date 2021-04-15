import axios from 'axios';

export default function axiosGetAllStaff(calendarStore) {
    
    const token = localStorage.getItem("token");
    
    if(token){
        axios.get("http://localhost:8080/fyp/api/user/all", {headers: {
            'Authorization' : 'Bearer ' + token
        }}).then(response => {
            var staffList =  response.data._embedded.userList.filter(user => user.is_staff === true);
            staffList.map(staff => {
                calendarStore.addStaffList({
                    id: staff.id,
                    email: staff.email,
                    fname: staff.fname,
                    lname: staff.lname,
                    username: staff.username,
                    isAdmin: staff.is_admin
                })
            })
            
            
        });
    }
}