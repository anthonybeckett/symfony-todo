import React from 'react';
import ReactDOM from 'react-dom';
import TodoContextProvider from "./js/contexts/TodoContext";
import TodoTable from "./js/components/TodoTable";
import {CssBaseline} from "@mui/material";
import AppSnackbar from "./js/components/AppSnackbar";

function App(props) {
    return (
        <TodoContextProvider>
            <CssBaseline>
                <TodoTable/>
                <AppSnackbar/>
            </CssBaseline>
        </TodoContextProvider>
    );
}

ReactDOM.render(<App/>, document.querySelector('#root'));