import React from 'react';
import PropTypes from 'prop-types';

import {makeStyles, Typography} from "@material-ui/core";

import OutlinedInputWithLabel from "../Inputs/OutlinedInputWithLabel";

const useStyles = makeStyles((theme) => ({
    input: {
        marginBottom: `${theme.spacing(1)}!important`,
    }
}));

export default function OutlinedInputWithLabelWithErrors(props) {
    const {id, color, type, value, onChange, errors, label, labelWidth, required} = props
    const classes = useStyles()
    return (
        <>
            <OutlinedInputWithLabel
                id={id}
                color={color}
                type={type}
                label={label}
                labelWidth={labelWidth}
                required={required}
                value={value}
                onChange={onChange}
                rootClass={classes.input}
            />
            {errors?.map(ele => (
                <Typography
                    key={ele}
                    variant={"body1"}
                    color={"error"}
                >
                    {ele}
                </Typography>
            ))}
        </>
    );
}

OutlinedInputWithLabelWithErrors.defaultProps = {
    color: "primary"
};

OutlinedInputWithLabelWithErrors.propTypes = {
    color: PropTypes.oneOf([
        "primary", "secondary",
    ]),
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.array.isRequired,
    required: PropTypes.bool.isRequired,
    labelWidth: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
};