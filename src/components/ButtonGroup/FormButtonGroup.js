import React from "react";
import PropTypes from "prop-types";

import {Grid, makeStyles} from "@material-ui/core";

import CustomButton from "../Button/CustomButton";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        margin: theme.spacing(1, 'auto', 0, 'auto'),
    }
}));

/**
 * Button layout container for forms
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function FormButtonGroup(props) {
    const { loading, rootClass, leftButton, rightButton } = props
    const classes = useStyles();

    return (
        <Grid
            container
            direction={"row"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            className={rootClass ?? classes.root}
        >
            {[leftButton, rightButton].map(ele => (
                <Grid item md={5} sm={12} xs={12} key={ele.label}>
                    <div className={ele?.class}>
                        <CustomButton
                            fullWidth
                            color={ele.color}
                            variant={ele === leftButton ? "outlined" : "contained"}
                            onClick={ele.onClick}
                            type={ele?.onClick ? "button" : "submit"}
                            progress={{
                                loading: ele === leftButton && loading
                            }}
                        >
                            {ele.label}
                        </CustomButton>
                    </div>
                </Grid>
            ))}
        </Grid>
    )
}

FormButtonGroup.defaultProps = {
    leftButton: {
        label: 'Submit',
    },
    rightButton: {
        label: 'Cancel',
        color: 'secondary'
    },
}

FormButtonGroup.propTypes = {
    loading: PropTypes.bool.isRequired,
    rootClass: PropTypes.node,
    leftButton: PropTypes.shape({
        label: PropTypes.string,
        class: PropTypes.string,
        errorButton: PropTypes.bool,
        onClick: PropTypes.func,
        color: PropTypes.oneOf([
            "primary", "secondary", "default", "inherit", "warning"
        ]),
        variant: PropTypes.oneOf([
            "outlined", "contained",
        ]),
    }),
    rightButton: PropTypes.shape({
        label: PropTypes.string,
        class: PropTypes.string,
        errorButton: PropTypes.bool,
        onClick: PropTypes.func,
        color: PropTypes.oneOf([
            "primary", "secondary", "default", "inherit", "warning"
        ]),
        variant: PropTypes.oneOf([
            "outlined", "contained",
        ]),
    }),
}
