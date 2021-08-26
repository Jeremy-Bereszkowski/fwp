import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {useMediaQuery, useTheme} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up("md")]: {
            flexGrow: 1,
            display: 'flex',
        },
    },
    tabRoot: {
        width: "100%",
        [theme.breakpoints.up("md")]: {
            paddingLeft: theme.spacing(3),
        }
    },
    tab: {
        borderRadius: theme.shape.borderRadius,
    },
    tabs: {
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            marginBottom: theme.spacing(2),
        },
        [theme.breakpoints.up("md")]: {
            width: theme.spacing(22),
            maxWidth: theme.spacing(22),
            minWidth: theme.spacing(22),
        },
    },
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const classes = useStyles()
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            className={classes.tabRoot}
            {...other}
        >
            {value === index && children}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

/**
 * Renders vertical tab selector and tab container
 *
 * @param panels
 * @returns {JSX.Element}
 * @constructor
 */
export default function VerticalTabs({panels}) {
    const classes = useStyles();
    const theme = useTheme();
    const isMdUp = useMediaQuery(theme.breakpoints.up("md"))

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => setValue(newValue);

    return (
        <div className={classes.root}>
            <Tabs
                orientation={isMdUp ? "vertical" : "horizontal"}
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                {panels.map((ele, key) => (
                    <Tab label={ele.label} {...a11yProps(key)} className={classes.tab} key={`${ele.label}-tab-label`}/>
                ))}
            </Tabs>
            {panels.map((ele, key) => (
                <TabPanel value={value} index={key} key={ele.label}>
                    {ele.render}
                </TabPanel>
            ))}
        </div>
    );
}
