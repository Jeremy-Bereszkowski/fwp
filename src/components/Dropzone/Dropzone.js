import React from 'react';
import PropTypes from 'prop-types'

import { DropzoneArea } from "material-ui-dropzone";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    chipContainer: {
        marginTop: theme.spacing(2)
    }
}));

export default function Dropzone({handleFileUpload}) {
    const classes = useStyles()
    return (
        <DropzoneArea
            onChange={handleFileUpload}
            filesLimit={1}
            maxFileSize={10000000}
            acceptedFiles={['image/jpeg', 'image/png']}
            showAlerts={false}
            showPreviews={true}
            showPreviewsInDropzone={false}
            previewGridClasses={{
                container: classes.chipContainer,
            }}
            classes={{
                root: classes.root,
            }}
        />
    );
}
Dropzone.propTypes = {
    handleFileUpload: PropTypes.func.isRequired,
};
