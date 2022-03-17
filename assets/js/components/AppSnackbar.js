import React, {useContext} from 'react';
import {Button, Snackbar, SnackbarContent} from "@mui/material";
import {TodoContext} from "../contexts/TodoContext";

function AppSnackbar(props) {
    const context = useContext(TodoContext);

    return (
        <Snackbar open={context.message.length > 0} autoHideDuration={3000}>
            <SnackbarContent message={context.message} action={[
                <Button onClick={() => context.setMessage('')} key="dismiss">Dismiss</Button>
            ]}/>
        </Snackbar>
    );
}

export default AppSnackbar;