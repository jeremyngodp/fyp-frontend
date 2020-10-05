import React, { Component } from "react";
import { Grid, Checkbox, Typography } from "@material-ui/core";
import { observer } from "mobx-react";
import AddEventButton from "../components/buttons/AddEventButton.jsx";
import ReusableSwipeableTemporaryDrawer from "./ReusableSwipableDrawer.jsx";

class LeftSideColumn extends Component {
    constructor(props) {
        super(props)
    }


    render () {
        const {calendarStore, type, calendarRef} = this.props
        return (
            <div className="LeftSideColumn">
                <Grid container>
                    <Grid item xs={12}>
                        <ReusableSwipeableTemporaryDrawer type={type} calendarStore={calendarStore}/>
                    </Grid>
                    <Grid item cs={12} style={{padding:'10px', border:'5px'}}>
                        <AddEventButton calendarStore={calendarStore} calendarRef={calendarRef}/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default LeftSideColumn