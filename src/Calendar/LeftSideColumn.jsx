import React, { Component } from "react";
import { Grid, Checkbox, Typography } from "@material-ui/core";
import { observer } from "mobx-react";
import AddEventButton from "../components/buttons/AddEventButton.jsx";
import ReusableSwipeableTemporaryDrawer from "./ReusableSwipableDrawer.jsx";
import { withStyles } from '@material-ui/core/styles';

const useStyles = (theme) => ({
    label: {
        display: 'inline',
        fontFamily: 'Roboto',
        fontSize: '15px'
    },
    square: {
        background: 'red',
        width: '15px',
        height: '15px',
        borderRadius: '50%',
        // width: 50vw;
        // height: 50vw;
    }
});

const LeftSideColumn = observer(
    class LeftSideColumn extends Component {
        constructor(props) {
            super(props)
        }

        renderOptionsButtonForStaff = () => {
            const { classes } = this.props;
            return (
                <div>
                    <Typography style={{ fontWeight: 'bold' }}>Filter by projects:</Typography>
                    {/* {this.props.calendarStore.getCheckboxes.map(item => (
                        <React.Fragment
                            key={item.key}>
                            <Checkbox
                                value={item.key}
                                defaultChecked
                                name={item.name}
                                onChange={(e) => this.handleChange(e)}
                                size="small"
                                style={{ color: item.color }}
                            />
                            <Typography className={classes.label}> {item.label}</Typography><br />
                        </React.Fragment>
                    ))} */}
                </div>
            )
    
            // )
        }
    

        render () {
            const {calendarStore, type, calendarRef} = this.props
            return (
                <div className="LeftSideColumn">
                    <Grid container>
                        <Grid item xs={12}>
                            {type === 'Student' ?
                                <ReusableSwipeableTemporaryDrawer type="Student" calendarStore={calendarStore} />
                                :
                                <ReusableSwipeableTemporaryDrawer type="Staff" calendarStore={calendarStore} />
                            }
                        </Grid>
                        
                        <Grid item cs={12} style={{padding:'10px', border:'5px'}}>
                            <AddEventButton calendarStore={calendarStore} calendarRef={calendarRef}/>
                        </Grid>
                        
                        <Grid item xs={12} style={{ paddingTop: '5px' }}>
                        {type === 'Student' ?
                            "" :
                            this.renderOptionsButtonForStaff()
                        }
                        </Grid>
                    </Grid>
                </div>
            )
        }
}
)
export default withStyles(useStyles) (LeftSideColumn);