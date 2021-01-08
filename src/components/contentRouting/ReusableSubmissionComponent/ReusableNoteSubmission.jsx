import React, { Component } from 'react';
import { Paper, TextField, Button, Typography, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AttachFileIcon from '@material-ui/icons/AttachFile';
/**
 * 
 * @props type Weekly Report or Meeting Notes?
 * @props onSubmitForm
 * @props handleChange
 * @props addAttachment
 * @props textfieldValue
 * @props textfieldName
 * @props buttonLabel
 * @props textfieldValue2
 * @props textfieldName2
 * @props noOfRows
 * @props selectedFile
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
    },
    bodyText: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        padding: '5px 0px',
    },
    paper: {
        width: '80%',
        padding: '20px',
        marginTop: '15px',
    }
})

const ReusableNotesSubmission = (props) => {
    const { classes } = props;
    return (
        <div>
            <form noValidate autoComplete="off" onSubmit={props.onSubmitForm} method="POST">
                <Paper elevation={2} className={classes.paper}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={12} lg={12}>
                            {props.type === 'Weekly Report' ?
                                <div style={{ display: 'flex' }}>
                                    <Typography className={classes.secondaryHeading} style={{ lineHeight: '40px' }}>
                                        Hours spent: &nbsp;
                                    </Typography>
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        type="number"
                                        style={{ width: '20%' }}
                                        value={props.textfieldValue2}
                                        onChange={props.handleChange}
                                        name={props.textfieldName2}
                                    />
                                </div>
                                : ''
                            }
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            {props.type === 'Weekly Report' ?
                                <Typography className={classes.secondaryHeading}>Things Completed:</Typography>
                                : ""
                            }
                            <TextField
                                variant="outlined"
                                multiline
                                rows={props.noOfRows}
                                style={{ width: '100%' }}
                                value={props.textfieldValue}
                                onChange={props.handleChange}
                                name={props.textfieldName}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            {
                                props.selectedFile ?
                                    <div>
                                        <AttachFileIcon style={{ float: 'left' }} /><Typography style={{ lineHeight: '22px' }} className={classes.bodyText}>{props.selectedFile.name}</Typography>
                                    </div>
                                    : ''
                            }
                        </Grid>
                        <Grid item xs={12} md={8} lg={8}>
                            <input
                                type="file"
                                onChange={props.addAttachment}
                                id="contained-button-file"
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="contained-button-file">
                                <Button color="primary" component="span" >
                                    Browse Files
                                </Button>
                            </label>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <Button type="submit" color="primary" variant="contained" style={{ float: 'right' }}>{props.buttonLabel}</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </form>
        </div>
    )
}

export default withStyles(useStyles)(ReusableNotesSubmission);