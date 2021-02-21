import React, { Component } from 'react';
import {  Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
// import ReactPDF from '../ReactPDF';
import FileViewer from 'react-file-viewer';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import GetAppIcon from '@material-ui/icons/GetApp';

class RenderDocumentPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false
        }
    }

    handleClickOpen = () => {
        this.setState({ openDialog: true })
    }

    handleClickClose = () => {
        this.setState({ openDialog: false })
    }

    typeTester = (itemURL) => {
       
            return <FileViewer
                fileType="docx"
                filePath={itemURL}
            />
    }

    render() {
        const { openDialog } = this.state;
        const {item_id} = this.props;
        var fileUrl ="http://localhost:8080/fyp/api/downloadFile/task/" + item_id
        return (
            <div>
                <Button onClick={this.handleClickOpen}>
                    <AttachFileIcon style={{ float: 'left' }} />&nbsp;<span style={{wordBreak: 'break-word'}} >documentName</span>
                </Button>
                <Dialog
                    open={openDialog}
                    onClose={() => this.handleClickClose()}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">documentName</DialogTitle>
                    <DialogContent>
                        {this.typeTester(fileUrl)}
                    </DialogContent>
                    <DialogActions>
                        <GetAppIcon style={{float: 'left'}}/>
                        <a style={{marginRight: '5px'}} href={fileUrl} download>Download attachment</a>
                        <Button onClick={() => this.handleClickClose()} color="primary" autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default RenderDocumentPreview