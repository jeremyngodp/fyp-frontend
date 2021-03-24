import React, { Component } from 'react';
import { Paper, TextField, Button, Typography, Grid, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import RenderDocumentPreview from '../RenderDocumentPreview';
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
                            {props.type === 'CommonTask' ?
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
                            {props.attachedFile != null ?
                                <React.Fragment>
                                    <Grid item xs={12} md={12} lg={12}>
                                        <Typography className={classes.secondaryHeading}>Attachments: </Typography>
                                        <RenderDocumentPreview  id={props.id} name={props.attachedFile.fileName}/>

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
                                                    {/* <Button style={{ float: 'right' }} variant="contained" color="primary" component="span" onClick={props.upload}>
                                                        Upload
                                                    </Button> */}
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
                        <Grid item xs={12} md={12} lg={12}>
                            {
                                props.selectedFile ?
                                <div>
                                    <Grid item>
                                        <AttachFileIcon style={{ float: 'left' }} /><Typography style={{ lineHeight: '22px' }} className={classes.bodyText}>{props.selectedFile.name}</Typography>
                                    </Grid>
                                    <Grid item>
                                        
                                        <Button style={{ float: 'right', marginRight: '10px' }} onClick={props.cancel}>
                                            Remove
                                        </Button>
                                    </Grid>
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