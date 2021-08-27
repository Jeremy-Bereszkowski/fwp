import React from 'react';
import PropTypes from "prop-types";
import {v4 as uuidv4} from "uuid";
import { useDebounce } from 'use-debounce';

import {
    Grid,
    makeStyles,
    Typography
} from "@material-ui/core";
import {DropzoneArea} from "material-ui-dropzone";

import AvatarDisplayCard from "../../Cards/AvatarDisplayCard";

import {avatarObject, useAuth} from "../../Providers/AuthProvider";
import CustomButton from "../../Button/CustomButton";

import {uploadBlob} from "../../../util/firebase/storage";
import {useSnackbar} from "notistack";

const useStyles = makeStyles(theme => ({
    cardContainer: {
        margin: theme.spacing(2, 0),
        marginBottom: "auto",
    },
    button: {
        margin: theme.spacing(2, 0),
    },
    chipContainer: {
        marginTop: theme.spacing(2)
    },
    dropZone: {
        "&:hover": {
            border: `1px solid ${theme.palette.type === "dark" ? "white" : "grey"}`
        }
    },
    buttonContainer: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        // [theme.breakpoints.down("sm")]: {
        //     alignItems: "center",
        // },
        // [theme.breakpoints.up('md')]: {
            alignItems: "flex-end",
        // }
    }
}));

export default function AvatarPanelBottomSection({onClick}) {
    const classes = useStyles();
    const { updateCurrentUserAvatar } = useAuth()
    const { enqueueSnackbar } = useSnackbar();

    const [files, setFiles] = React.useState([])
    const [key, setKey] = React.useState(0);
    const [debounceKey] = useDebounce(key, 100);

    const handleFilesSet = (files) => setFiles(files);
    const handleFilesReset = () => setFiles([]);

    const onUploadProfilePic = () => {
        if (files.length === 0) return

        const id = uuidv4()
        uploadBlob(id, files[0])
            .then(() => {
                updateCurrentUserAvatar(avatarObject("url", id, ""));
                handleFilesReset()
                setKey(key => ++key)
                enqueueSnackbar('Profile picture uploaded', { variant: 'success' });
            })
    }

    return (
        <>
            <Typography
                variant={"h4"}
                component={"p"}
                color={"textSecondary"}
            >
                Image:
            </Typography>
            <Grid
                container
                justifyContent={"space-between"}
            >
                <Grid item md={8} sm={8} xs={8}>
                    <div className={classes.cardContainer}>
                        <DropzoneArea
                            key={debounceKey}
                            onChange={handleFilesSet}
                            filesLimit={1}
                            acceptedFiles={['image/jpeg', 'image/png']}
                            showAlerts={false}
                            previewGridClasses={{
                                container: classes.chipContainer,
                            }}
                            dropzoneClass={classes.dropZone}
                        />
                    </div>
                </Grid>
                <Grid item md={3} sm={3} xs={3} className={classes.buttonContainer}>
                    <div className={classes.cardContainer}>
                        <AvatarDisplayCard
                            onClick={onClick}
                            color={""}
                            label={"Image"}
                        />
                    </div>
                    <div className={classes.button}>
                        <CustomButton
                            variant={"contained"}
                            color={"primary"}
                            onClick={onUploadProfilePic}
                        >
                            Upload
                        </CustomButton>
                    </div>
                </Grid>
            </Grid>
        </>
    );
}

AvatarPanelBottomSection.propTypes = {
    onClick: PropTypes.func.isRequired,
};
