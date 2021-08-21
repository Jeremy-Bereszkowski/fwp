import React from 'react';
import PropTypes from 'prop-types';

import {
    CardActions, Grid, IconButton,
    makeStyles,
    Toolbar, Tooltip, Typography, useTheme
} from "@material-ui/core";
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import CustomButton from "../Button/CustomButton";

const useStyles = makeStyles((theme) => ({
    cardActions: {
        padding: theme.spacing(1, 2),
    },
    buttonContainer: {
        marginRight: "auto"
    },
    button: {
        marginLeft: theme.spacing(1),
    },
    uploadString: {
        marginLeft: `${theme.spacing(1)}!important`,
    }
}));

export default function PostCardActions({color, files, handleFileUploadDialogOpen, leftButton, rightButton}) {
    const classes = useStyles();
    const theme = useTheme();
    const isDarkTheme = theme.palette.type === "dark"
    return (
        <CardActions className={classes.cardActions}>
            <Grid
                container
                justifyContent={"space-between"}
                alignItems={"center"}
            >
                <Grid item>
                    {handleFileUploadDialogOpen && (
                        <Toolbar disableGutters>
                            <Tooltip
                                title={"Upload Image"}
                                placement={"right"}
                            >
                                <IconButton
                                    type={"button"}
                                    color={isDarkTheme ? "default" : "primary"}
                                    onClick={handleFileUploadDialogOpen}
                                >
                                    <PhotoLibraryIcon/>
                                </IconButton>
                            </Tooltip>
                            {files && (
                                <Typography
                                    variant={"body2"}
                                    color={"textSecondary"}
                                    className={classes.uploadString}
                                >
                                    Uploaded!
                                </Typography>
                            )}
                        </Toolbar>
                    )}
                </Grid>
                <Grid item>
                    <Toolbar disableGutters>
                        <div className={classes.button}>
                            <CustomButton
                                type={"button"}
                                color={color}
                                variant={"outlined"}
                                onClick={leftButton.onClick}
                                whiteText={theme.palette.type === "dark"}
                            >
                                {leftButton.label}
                            </CustomButton>
                        </div>
                        <div className={classes.button}>
                            <CustomButton
                                type={"submit"}
                                color={color}
                                variant={"contained"}
                                onClick={rightButton.onClick}
                                progress={{
                                    loading: rightButton.loading
                                }}
                            >
                                {rightButton.label}
                            </CustomButton>
                        </div>
                    </Toolbar>
                </Grid>
            </Grid>
        </CardActions>
    );
}

PostCardActions.propTypes = {
    files: PropTypes.bool,
    handleFileUploadDialogOpen: PropTypes.func,
    color: PropTypes.oneOf([
       "primary", "secondary"
    ]),
    leftButton: PropTypes.shape({
        label: PropTypes.string,
        onClick: PropTypes.func,
    }).isRequired,
    rightButton: PropTypes.shape({
        label: PropTypes.string,
        onClick: PropTypes.func,
        loading: PropTypes.bool,
    }).isRequired,
};
