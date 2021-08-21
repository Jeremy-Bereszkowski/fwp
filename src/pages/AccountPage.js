import React from 'react';
import { useSnackbar } from 'notistack';

import {
    makeStyles,
    Grid,
    Typography,
    IconButton,
    Tooltip,
} from "@material-ui/core";

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import DefaultLayout from "../layouts/DefaultLayout";

import {useAuth} from "../components/Provides/AuthProvider";
import WarningDialog from "../components/Dialog/WarningDialog";
import VerticalTabs from "../components/Tabs/TabPanel";
import AvatarPanel from "../components/TabPanels/AvatarPanel/AvatarPanel";
import AccountDetailsPanel from "../components/TabPanels/AccountDetailsPanel";

const useStyles = makeStyles((theme) => ({
    tabContainer: {
        marginTop: theme.spacing(1),
    },
    memberString: {
        margin: theme.spacing(0, 2, 0, 0)
    }
}));

export default function AccountPage() {
    const { currentUser, deleteUser } = useAuth()
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const [dialogOpen, setDialogOpen] = React.useState(false);

    const handleDialogOpen = () => setDialogOpen(true);
    const handleDialogClose = () => setDialogOpen(false);

    const onDelete = () => {
        deleteUser(currentUser)
        enqueueSnackbar('Account deleted!', { variant: 'warning' });
    }
    return (
        <DefaultLayout>
            <Grid
                container
                alignItems={"center"}
                justifyContent={"space-between"}
            >
                <Grid item>
                    <Typography
                        variant={"h6"}
                        component={"h3"}
                        align={"left"}
                    >
                        My Account
                    </Typography>
                </Grid>
                <Grid item>
                    <Grid
                        container
                        alignItems={"center"}
                    >
                        <Grid item>
                            <Typography
                                variant={"body2"}
                                color={"textPrimary"}
                                className={classes.memberString}
                            >
                                Member since: {currentUser.joinDate}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Tooltip title={'Delete'} placement={"bottom"}>
                                <IconButton onClick={handleDialogOpen}>
                                    <DeleteOutlineIcon color={"error"}/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <div className={classes.tabContainer}>
                <VerticalTabs
                    panels={[
                        {
                            label: "Avatar",
                            render: <AvatarPanel/>
                        },
                        {
                            label: "Details",
                            render: <AccountDetailsPanel/>
                        },
                    ]}
                />
            </div>
            <WarningDialog
                headerLabel={'Warning!'}
                open={dialogOpen}
                handleClose={handleDialogClose}
                handleSubmit={onDelete}
            >
                <Typography variant={"body1"}>
                    Are you sure you want to delete your account? This is irreversible.
                </Typography>
            </WarningDialog>
        </DefaultLayout>
    );
}