import React, {useContext, useState} from 'react';
import {TodoContext} from "../contexts/TodoContext";
import {IconButton, InputAdornment, Table, TableBody, TableCell, TableHead, TableRow, TextField} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import DeleteDialog from "./DeleteDialog";

function TodoTable(props) {
    const context = useContext(TodoContext);
    const [addTodo, setAddTodo] = useState('');
    const [editId, setEditId] = useState(0);
    const [editTodo, setEditTodo] = useState('');
    const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(false);
    const [deleteTodo, setDeleteTodo] = useState(0);

    return (
        <>
            <form onSubmit={(e) => {context.createTodo(e, {id: context.todos.length+1, name: addTodo}); setAddTodo('')}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TextField
                                    value={addTodo}
                                    onChange={(e) => {setAddTodo(e.target.value)}}
                                    label="New Task"
                                    fullWidth={true}
                                />
                            </TableCell>

                            <TableCell align="right">
                                <IconButton type="submit">
                                    <AddIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>Task</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {context.todos.map((todo) => (
                            <TableRow key={todo.id}>
                                <TableCell>
                                    {editId === todo.id ?
                                        <TextField
                                            fullWidth={true}
                                            value={editTodo}
                                            onChange={e => setEditTodo(e.target.value)}
                                            InputProps={{
                                                endAdornment:
                                                    <>
                                                        <IconButton onClick={() => {context.updateTodo({id: todo.id, name: editTodo}); setEditId(0);}}><DoneIcon /></IconButton>
                                                        <IconButton onClick={() => {setEditId(0); setEditTodo('')}}><CloseIcon /></IconButton>
                                                    </>
                                            }}
                                        />
                                        : todo.name
                                    }
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => {setEditTodo(todo.name); setEditId(todo.id)}}>
                                        <EditIcon/>
                                    </IconButton>

                                    <IconButton onClick={() => {setDeleteConfirmationIsShown(true); setDeleteTodo(todo.id)}}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </form>

            <DeleteDialog todoId={deleteTodo} open={deleteConfirmationIsShown} setDeleteConfirmationIsShown={setDeleteConfirmationIsShown} />
        </>

    );
}

export default TodoTable;