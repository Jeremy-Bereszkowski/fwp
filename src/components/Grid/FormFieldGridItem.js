import React from "react";

import {Grid} from "@material-ui/core";

export default function FormFieldGridItem({children}) {
    return <Grid item lg={12} md={12} xs={12}>{children}</Grid>
}