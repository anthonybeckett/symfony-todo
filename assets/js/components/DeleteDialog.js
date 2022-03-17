import React, {useContext} from 'react';
import PropTypes from "prop-types";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {TodoContext} from "../contexts/TodoContext";

function DeleteDialog({ open, setDeleteConfirmationIsShown, todoId }) {
    const context = useContext(TodoContext);

    const hide = () => {
        setDeleteConfirmationIsShown(false)
    }

    return (
        <Dialog open={open} onClose={() => hide()}>
            <DialogTitle>Are you sure you want to delete this item?</DialogTitle>
            <DialogContent></DialogContent>

            <DialogActions>
                <Button onClick={() => hide()}>Cancel</Button>
                <Button onClick={() => {context.deleteTodo(todoId); hide();}}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
}

DeleteDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setDeleteConfirmationIsShown: PropTypes.func.isRequired,
    todoId: PropTypes.number.isRequired
};

export default DeleteDialog;