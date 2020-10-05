import { observable, action, computed, makeObservable } from "mobx"

class CalendarStore {
    newData = []
    userData = ''
    userType = ''

    constructor() {
        makeObservable(this, {
            newData: observable,
            userData: observable,
            userType: observable,

            getData: computed,
            getUserType: computed,

            addData: action,
            addUserType: action,
        })
    }

    get getData() {
        return this.newData;
    }

    get getUserData() {
        return this.userData;
    }

    get getUserType() {
        return this.userType;
    } 

    addData(e) {
        this.newData.push(e);
    }

    addUserType = (e) => {
        this.userType = e;
    }
    


}    
export default CalendarStore;

