import React, { Component } from 'react';
import { Paper, TextField, Button, Typography, Grid, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import RenderDocumentPreview from '../RenderDocumentPreview';

/**
 * 
 * @props type Weekly Report or Meeting Notes?
 * @props hours_spent
 * @props content
 * @props documents
 * @props addAttachment
 * @props upload
 * @props selectedFile
 * @props cancel
 */

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
        fontWeight: 'bold',
        padding: '5px 0px',
    },
    bodyText: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        padding: '5px 0px',
    },
    paper: {
        width: '80%',
        padding: '15px',
        marginTop: '15px',
    }
})

const ReusableNotesCompleted = (props) => {
    const { classes } = props;
    return (
        <div>
            <Paper elevation={2} className={classes.paper}>
                <Grid container spacing={1}>
                    {props.type === 'Weekly Report'
                        ?
                        <Grid item xs={12} md={12} lg={12}>
                            <div style={{ display: 'flex' }}>
                                <Typography className={classes.secondaryHeading}>
                                    Hours spent: &nbsp;
                            </Typography>
                                <Typography className={classes.bodyText}>
                                    {props.hourSpent}
                                </Typography>
                            </div>
                        </Grid>
                        : ""
                    }
                    <Grid item xs={12} md={12} lg={12}>
                        <div>
                            <Typography className={classes.secondaryHeading}>
                                {props.type === 'Weekly Report'
                                    ? "Things Completed: "
                                    : "Meeting Notes: "
                                }
                            </Typography>
                            <Typography className={classes.bodyText}>
                                {props.content}
                            </Typography>
                        </div>
                    </Grid>
                    {props.type === 'Weekly Report'
                        ? <React.Fragment>
                            <Grid item xs={12} md={12} lg={12}>
                                <Typography className={classes.secondaryHeading}>Attachments: </Typography>
                                <RenderDocumentPreview  id={props.id} />

                                <Divider />
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <input
                                    type="file"
                                    onChange={props.addAttachment}
                                    id="contained-button-file"
                                    style={{ display: 'none' }}
                                />
                                <label htmlFor="contained-button-file">
                                    <Button color="primary" component="span" >
                                        + Attach More Files
                        </Button>
                                </label>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                {props.selectedFile ?
                                    <div>
                                        <Grid item>
                                            <AttachFileIcon style={{ float: 'left' }} /><Typography>{props.selectedFile.name}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Button style={{ float: 'right' }} variant="contained" color="primary" component="span" onClick={props.upload}>
                                                Upload
                                </Button>
                                            <Button style={{ float: 'right', marginRight: '10px' }} onClick={props.cancel}>
                                                Cancel
                                </Button>
                                        </Grid>
                                    </div>
                                    : ""
                                }

                            </Grid>
                        </React.Fragment>
                        : ''
                    }

                </Grid>
            </Paper>
        </div>
    )
}

export default withStyles(useStyles)(ReusableNotesCompleted);