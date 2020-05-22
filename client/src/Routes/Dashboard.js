import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchJokes } from '../Redux/Actions/MainActions';

function Dashboard({jokes, fetchJokes}) {

    useEffect(() => {
        fetchJokes();
    }, [])

    return (
        <div>
            <ul>
                { !jokes && <p>Loading jokes...</p>}
                {
                    jokes && jokes.map(joke => (
                        <li key={joke.id}>
                            {joke.joke}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default connect(({ jokes }) => ({ jokes }), {
    fetchJokes
})(Dashboard);