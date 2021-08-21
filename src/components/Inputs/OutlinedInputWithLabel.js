import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

import { FormControl, InputLabel, OutlinedInput } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    formRow: {
        marginTop: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginLeft: `auto`,
            marginRight: `auto`,
        },
        [theme.breakpoints.up('md')]: {
            width: '100%',
        },
    },
    fieldText: {
        color: `${theme.palette.text.secondary}!important`,
    },
}));

export default function OutlinedInputWithLabel(props) {
    const {rootClass, id, type, value, color, onChange, label, labelWidth, disabled, required, endAdornment, rows, multiline} = props
    const classes = useStyles();

    return (
        <FormControl className={clsx(rootClass, classes.formRow)} variant="outlined">
            <InputLabel className={classes.fieldText} htmlFor={`outlined-adornment-${id}`}>{label}</InputLabel>
            <OutlinedInput
                id={id}
                name={id}
                type={type}
                value={value}
                onChange={onChange}
                labelWidth={labelWidth}
                disabled={disabled}
                required={required}
                endAdornment={endAdornment}
                rows={rows}
                multiline={multiline}
                fullWidth={true}
                color={color}
            />
        </FormControl>
    )
}

OutlinedInputWithLabel.defaultProps = {
    disabled: false,
    multiline: false,
    color: "primary",
}

OutlinedInputWithLabel.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string.isRequired,
    labelWidth: PropTypes.number.isRequired,
    required: PropTypes.bool.isRequired,
    rootClass: PropTypes.string,
    disabled: PropTypes.bool,
    multiline: PropTypes.bool,
    endAdornment: PropTypes.node,
    color: PropTypes.string,
}
