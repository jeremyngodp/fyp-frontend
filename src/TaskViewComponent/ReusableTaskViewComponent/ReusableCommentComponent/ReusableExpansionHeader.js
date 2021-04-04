import React, { Component } from 'react';
import { Grid, Box, Typography } from '@material-ui/core';

/**
 * 
 * @props week_no
 * @props title1
 * @props title2
 * @props title3
 * @props title4
 */

const ReusableExpansionHeader = (props) => {
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={1} />
                <Grid item xs={2}>
                    <Typography variant="subtitle1">
                        <Box fontWeight="fontWeightBold">
                            {props.week_no}
                        </Box>
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="subtitle1">
                        <Box fontWeight="fontWeightBold">
                            {props.title1}
                        </Box>
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="subtitle1">
                        <Box fontWeight="fontWeightBold">
                            {props.title2}
                        </Box>
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="subtitle1">
                        <Box fontWeight="fontWeightBold">
                            {props.title3}
                        </Box>
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="subtitle1">
                        <Box fontWeight="fontWeightBold">
                            {props.title4}
                        </Box>
                    </Typography>
                </Grid>
                <Grid item xs={1} />
            </Grid>
        </div>
    )
}

export default ReusableExpansionHeader;