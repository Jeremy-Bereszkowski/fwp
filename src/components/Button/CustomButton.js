import React from 'react';
import clsx from "clsx";
import PropTypes from "prop-types"

import {
    makeStyles,
    Button,
    CircularProgress,
    Typography
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    progressButton: {
        paddingRight: "3rem",
    },
    progress: {
        color: theme.palette.common.white,
    },
    endIcon: {
        position: 'absolute',
        right: '1rem',
    },
    whiteText: {
        color: `${theme.palette.common.white}!important`,
    },
    primaryContained: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.type === 'dark' ? theme.palette.primary.main : theme.palette.primary.main,
        "&:hover": {
            backgroundColor: theme.palette.type === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light,
        }
    },
    primaryOutlined: {
        color: theme.palette.type === 'dark' ? theme.palette.common.white : theme.palette.primary.main,
        borderColor: theme.palette.type === 'dark' ? theme.palette.primary.main : theme.palette.primary.main,
        "&:hover": {
            color: theme.palette.type === 'dark' ? theme.palette.common.white : theme.palette.primary.dark,
            borderColor: theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark,
        }
    },
    secondaryContained: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.type === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.main,
        "&:hover": {
            backgroundColor: theme.palette.type === 'dark' ? theme.palette.secondary.dark : theme.palette.secondary.light,
        }
    },
    secondaryOutlined: {
        color: theme.palette.secondary.light,
        borderColor: theme.palette.secondary.light,
        "&:hover": {
            backgroundColor: "rgb(256, 256, 256, 0.1)",
        }
    },
    warningContained: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.type === 'dark' ? theme.palette.warning.dark : theme.palette.warning.main,
        "&:hover": {
            backgroundColor: theme.palette.type === 'dark' ? theme.palette.warning.main : theme.palette.warning.light,
        }
    },
    warningOutlined: {
        color: theme.palette.type === 'dark' ? theme.palette.warning.dark : theme.palette.warning.main,
        borderColor: theme.palette.type === 'dark' ? theme.palette.warning.dark : theme.palette.warning.main,
        "&:hover": {
            color: theme.palette.type === 'dark' ? theme.palette.warning.main : theme.palette.warning.light,
            borderColor: theme.palette.type === 'dark' ? theme.palette.warning.main : theme.palette.warning.light,
        }
    },
}));

const capitlalizeWord = (string) => `${string}`.charAt(0).toUpperCase() + string.slice(1);

/**
 * Custom button
 *  Can handle loading spinner
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function CustomButton(props) {
    const {onClick, variant, color, whiteText, progress, type, fullWidth, children} = props

    const classes = useStyles();
    const buttonClasses = clsx({
        [classes.button]: true,
        [classes.whiteText]: whiteText,
        [classes.progressButton]: progress?.loading,
        [classes[`${color}${capitlalizeWord(variant)}`]]: color && variant,
    })

    return (
        <Button
            size="medium"
            variant={variant}
            onClick={onClick}
            type={type}
            endIcon={progress?.loading && (
                <CircularProgress
                    size={20}
                    className={classes.progress}
                />
            )}
            className={buttonClasses}
            classes={{endIcon: classes.endIcon}}
            fullWidth={fullWidth}
        >
            <Typography variant={"button"}>
                {children}
            </Typography>
        </Button>
    );
}

CustomButton.defaultProps = {
    fullWidth: false,
    type: 'button',
    whiteText: false,
}

CustomButton.propTypes = {
    children: PropTypes.node.isRequired,
    whiteText: PropTypes.bool,
    onClick: PropTypes.func,
    fullWidth: PropTypes.bool,
    type: PropTypes.string,
    variant: PropTypes.oneOf([
        "contained", "outlined", "text"
    ]),
    color: PropTypes.oneOf([
        "primary", "secondary", "default", "inherit", "warning"
    ]),
    progress: PropTypes.shape({
        loading: PropTypes.bool
    })
}