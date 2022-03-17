import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios';

export const TodoContext = createContext([]);

function TodoContextProvider({children}) {
    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState('');

    const createTodo = async (e, todo) => {
        e.preventDefault();

        if (todo.name === '') {
            return false;
        }

        const response = await axios.post('/api/todo/create', {
            method: 'POST',
            data: todo
        });

        if (response.status !== 200) {
            setMessage('Could not create todo.');
            return console.error(response);
        }

        setTodos([...todos, response.data.todo]);

        setMessage('Todo has been created');
    }

    const readTodo = async () => {
        const response = await axios.get('/api/todo/read');

        if (response.status !== 200) {
            return console.error(response)
        }

        setTodos(response.data);
    }

    const updateTodo = async (data) => {
        let todo = todos.find(todo => todo.id === data.id);
        todo.name = data.name;

        setTodos(todos);

        const response = await axios.put(`/api/todo/update/${data.id}`, data);

        if (response.status !== 200) {
            return console.error(response);
        }
    }

    const deleteTodo = async (id) => {
        setTodos(todos.filter(todo => todo.id !== id));

        const response = await axios.delete(`/api/todo/delete/${id}`);

        if (response.status !== 200) {
            return console.error(response);
        }
    }

    useEffect(() => {
        readTodo();
    }, []);

    return (
        <TodoContext.Provider value={{
            todos,
            message,
            createTodo: createTodo,
            readTodo: readTodo,
            updateTodo: updateTodo,
            deleteTodo: deleteTodo,
            setMessage: setMessage
        }}>
            {children}
        </TodoContext.Provider>
    );
}

export default TodoContextProvider;