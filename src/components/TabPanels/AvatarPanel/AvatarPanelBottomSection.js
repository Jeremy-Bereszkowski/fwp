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

import {avatarMap, useAuth} from "../../Providers/AuthProvider";
import CustomButton from "../../Button/CustomButton";

import {uploadBlob} from "../../../util/firebase/storage";
import {useSnackbar} from "notistack";

const useStyles = makeStyles(theme => ({
    cardContainer: {
        margin: theme.spacing(2, 0)
    },
    chipContainer: {
        marginTop: theme.spacing(2)
    },
    dropZone: {
        "&:hover": {
            border: `1px solid ${theme.palette.type === "dark" ? "white" : "grey"}`
        }
    }
}));

export default function AvatarPanelBottomSection({onClick}) {
    const classes = useStyles();
    const {setCurrentUserAvatar} = useAuth()
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
                setCurrentUserAvatar(avatarMap("url", id, ""));
                handleFilesReset()
                setKey(key => ++key)
                enqueueSnackbar('Profile picture uploaded', { variant: 'success' });
            })
    }

    return (
        <Grid
            container
            alignItems={"stretch"}
            alignContent={"stretch"}
            justifyContent={"space-between"}
        >
            <Grid item md={2} style={{display: "flex", alignItems: "center"}}>
                <Typography
                    variant={"h4"}
                    component={"p"}
                    color={"textSecondary"}
                    align={"center"}
                >
                    Image:
                </Typography>
            </Grid>
            <Grid item md={7}>
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
            <Grid item md={2}>
                <Grid
                    container
                    direction={"column"}
                    justifyContent={"space-between"}
                    alignContent={"stretch"}
                    alignItems={"flex-end"}
                    style={{height: "100%"}}
                >
                    <Grid item>
                        <div className={classes.cardContainer}>
                            <AvatarDisplayCard
                                onClick={onClick}
                                color={""}
                                label={"Image"}
                            />
                        </div>
                    </Grid>
                    <Grid item>
                        <div className={classes.cardContainer}>
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
            </Grid>
        </Grid>
    );
}

AvatarPanelBottomSection.propTypes = {
    onClick: PropTypes.func.isRequired,
};
