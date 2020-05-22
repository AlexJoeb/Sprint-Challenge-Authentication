import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function Register() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const handleSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:3300/api/auth/register', {
            username, password
        })
        .then(resp => {
            console.log(resp);
        }).catch(error => {
            console.log(error.message);
        })
    }

    const handleRedirect = path => {
        history.push(path);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" id="username" value={username} placeholder='Username' onChange={({ target }) => setUsername(target.value)} />
                <input type="text" name="password" id="password" value={password} placeholder='Password' onChange={({ target }) => setPassword(target.value)} />
                <button type="submit">Register</button>
                <button onClick={() => handleRedirect('/login')}>Login</button>
            </form>
        </div>
    )
}