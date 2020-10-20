import React from 'react';
import {observer} from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button, TextField, Paper } from '@material-ui/core';
import moment from 'moment'

const useStyles = (theme) => ({
    root: {
          width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(20),
        fontWeight: 'bold'
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: 'bold'
    },
    bodyText: {
        fontSize: theme.typography.pxToRem(15),
        
    },

    dateText: {
        fontSize: theme.typography.pxToRem(12),
        color: theme.palette.text.secondary,
    },

    paper: {
        padding: '15px',
        marginTop: '15px',
        minHeight: '200px',
    }
})
  
const ReusableCommentBox = observer(
    class ReusableCommentBox extends React.Component {
        constructor(props) {
            super(props);
            this.state ={
                comment: "",
                tasks: this.props.calendarStore.getData,
                buttonLabelState: "Add a new comment",
            }    
        }

        handleChange = (e) => {
            const value = e.target.value;
            this.setState({
                ...this.state,
                [e.target.name]: value
            })
        }

        updateCalendarStore = () => {
            const { dataArray, comment } = this.state;
            const { calendarStore, task_id, user_id } = this.props;
            const { getData } = calendarStore;
            
            const index = this.state.tasks.findIndex(task => task.Id === task_id)
            dataArray[index].comments.push({ task_id: task_id, user_id: user_id, created_date: moment(new Date()), content: comment })
            this.setState({ dataArray });
          }
        
          clearCommentBox = () => {
            this.setState({ comment: "" })
          }

        onSubmitComment = (e) => {
            e.preventDefault();
            const { comment, buttonLabelState } = this.state;
            const { id, user_id } = this.props;
            var created_date = moment()
            //bruh: u need to be able to determine if the user is student or tutor -- next time when logging in is available
            if (comment === "") {
              alert("Please fill in a comment before submitting");
            } else {
            //   axiosPostComment(user_id, content, created_date);
        
              //Update calendar store so that comment will be reflected
            //   this.updateCalendarStore();
                alert("comment added");
              //clear comment box:
            //   this.clearCommentBox();
            }
        }

        addAComment = (buttonLabel) => {
            const { comment } = this.state;
            const { classes } = this.props;
            return (
                <form noValidate autoComplete="off" onSubmit={this.onSubmitComment} method="POST">
                    <div>
                        <Paper elevation={2} style={{ width: '70%' }} className={classes.paper}>
                            <TextField
                                multiline
                                rows="5"
                                style={{
                                    width: '100%'
                                }}
                                value={comment}
                                onChange={this.handleChange}
                                name="comment"
                                placeholder="Type in your comments"
                            ></TextField>
                            <br /><br />
                            <Button type="submit" color="primary" variant="contained" style={{ padding: '10px', float: 'right' }}>{buttonLabel}</Button>
                        </Paper>
                    </div>
                </form>
            )
        }

        renderNoCommentsView = () => {
            return (
                <div>
                    No comments yet. <br />
                    {this.addAComment("Add a new comment")}
                </div>
            )
        }

        renderCommentsView = () => {
            const { comments, classes } = this.props;
            // const getListOfAllIdsAndUsernames = this.props.calendarStore.getListOfAllIdsAndUsernames
            //Logic: Depending on user_id of comment, we reflect username
            return (
                <div>
                    {comments.map((data, index) => {
                        // var username = getListOfAllIdsAndUsernames.find(item => {
                        //     if (item.id === data.user_id) {
                        //         return item.username
                        //     }
                        // })
                        return (
                            <div key={index} style={{ padding: '7px' }}>
                                <div style={{ display: 'flex' }}>
                                    <Typography className={classes.secondaryHeading}>
                                    {
                                        data.user_id //will change to email once backend is updated
                                    }&nbsp;</Typography>
                                    <Typography className={classes.dateText}> on {moment(data.created_date).format('LLL')}</Typography>
                                </div>
                                <div style={{ padding: '5px 0px 0px 5px', height: '100%', display: 'flex' }}>
                                    <div style={{ borderLeft: '2px solid lightgrey', minHeight: '100%', marginRight: '10px' }}></div>
                                    <Typography className={classes.bodyText}>{data.content}</Typography>
                                </div>
                            </div>
                        )
                    })}

                    {this.addAComment("Reply")}
                </div>
            )
          }

        render() {
            const {comments, classes} = this.props;
            return (
                <div style={{ width: '100%' }}>
                    <Typography className={classes.heading}>Comments:</Typography>
                    {comments.length === 0 ? this.renderNoCommentsView() : this.renderCommentsView()}
                </div>
              )
            
        }
    }
);

export default withStyles(useStyles) (ReusableCommentBox);