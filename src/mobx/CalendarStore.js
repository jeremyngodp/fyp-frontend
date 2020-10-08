import { observable, action, computed, makeObservable } from "mobx"

class CalendarStore {
    newData = []
    userData = ''
    userType = ''
    defaultState = {state:'Reports', index:0}

    constructor() {
        makeObservable(this, {
            newData: observable,
            userData: observable,
            userType: observable,
            defaultState: observable,

            getData: computed,
            getUserType: computed,
            getDefaultState: computed,

            addData: action,
            addUserType: action,
            changeDefaultState: action,
            setUserData: action,
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

    get getDefaultState() {
        return this.defaultState;
    }

    addData(e) {
        this.newData.push(e);
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
    


}    
export default CalendarStore;

