import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux'
import { setToken } from '../Redux/Actions/MainActions';
function Login({ setToken }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const handleSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:3300/api/auth/login', {
            username, password
        })
        .then(({ data }) => {
            const { token } = data;
            console.log(token);
            setToken(token);
            handleRedirect('/dashboard');
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
                <input type="text" name="username" id="username" placeholder='Username' value={username} onChange={({ target }) => setUsername(target.value)} />
                <input type="text" name="password" id="password" placeholder='Password' value={password} onChange={({ target }) => setPassword(target.value)} />
                <button type="submit">Login</button>
                <button onClick={() => handleRedirect('/register')}>Register</button>
            </form>
        </div>
    )
}

export default connect(() => ({}), {
    setToken
})(Login);