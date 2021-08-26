import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

import {
    Divider,
    List,
    ListItem,
    makeStyles,
} from "@material-ui/core";

import {useAuth} from "../Providers/AuthProvider";
import {Urls} from "../../data/Urls";
import MenuHeader from "../Menu/MenuHeader";

const useStyles = makeStyles(theme => ({
    padding: {
        padding: "0",
    },
    link: {
        textDecoration: "none",
        color: "inherit",
    },
    avatar: {
        backgroundColor: theme.palette.type === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.light,
        color: theme.palette.type === 'dark' ? "rgba(255, 255, 255, 0.7)" : "white",
        "&:hover": {
            backgroundColor: theme.palette.type === 'dark' ? theme.palette.secondary.dark : theme.palette.secondary.main,
        }
    },
    menuHeader: {
        margin: theme.spacing(0, 14, 4, 2)
    },
    menuSubHeader: {
        margin: theme.spacing(0, 14, 0, 2)
    }
}));

export const navLinks = [
    {label: "Feed", url: Urls.FEED, title: "Feed Link"},
    {label: "My Account", url: Urls.ACCOUNT, title: "Account Link"},
]

export default function NavList({onClose}) {
    const classes = useStyles();
    const auth = useAuth();
    return (
        <List>
            <MenuHeader/>
            <Divider variant={"middle"}/>
            {navLinks.map(ele => (
                <React.Fragment key={ele.label}>
                    <Link
                        to={ele.url}
                        className={classes.link}
                        title={ele.title}
                    >
                        <ListItem
                            disableGutters={false}
                            onClick={onClose}
                            button
                        >
                            {ele.label}
                        </ListItem>
                    </Link>
                    <Divider variant={"middle"}/>
                </React.Fragment>
            ))}
            <ListItem
                onClick={auth.signOut}
                button
            >
                Sign out
            </ListItem>
            <Divider variant={"middle"}/>
        </List>
    );
}

NavList.propTypes = {
    onClose: PropTypes.func.isRequired,
};
