import React, { useState } from 'react'
import FacebookIcon from '@material-ui/icons/Facebook';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { FormControl, Input, Button } from '@material-ui/core';
import "./user.css";

export default function SignUp() {
    const initialState = {
        name: '',
        email: '',
        password: '',
    }

    const [state, setstate] = useState(initialState);
    const [isSignedUp, setIsSignedUp] = useState(false);
    const [message, setMessage] = useState('');
    const changeHandler = e => {
        initialState[e.target.name] = e.target.value;
    }

    const submitHandler = e => {
        e.preventDefault();
        axios.post('/api/user/signup', initialState)
            .then(res => {
                if (res.status === 201) setIsSignedUp(true);
                if (res.status === 202) setMessage(res.data);
            });
    }

    return (
        <div className="SignUp">
            {isSignedUp ? <Redirect to="/cars" /> : ''}
            <form onSubmit={submitHandler}>
                <Input type="text" name="name" onChange={changeHandler} placeholder="Full-Name" /><br />
                <Input type="email" name="email" onChange={changeHandler} placeholder="email" /><br />
                <Input type="password" name="password" onChange={changeHandler} placeholder="password" /><br />
                <Button type="submit">Signup </Button>
            </form>
            {message ? message : ''}
            <a href="http://localhost:2000/api/user/auth/facebook"><FacebookIcon />SignUp with Facebook</a>
        </div>
    )
}
