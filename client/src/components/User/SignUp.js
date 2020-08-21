import React, { useState } from 'react'
import FacebookIcon from '@material-ui/icons/Facebook';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { FormControl, Input, Button } from '@material-ui/core';
import "./user.css";

export default function SignUp(props) {
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
                console.log(res);
                if (res.status === 201) {
                    setIsSignedUp(true);
                    props.logIN();
                };
                if (res.status === 202) setMessage(res.data);
            });
    }

    return (
        <div className="SignUp">
            {isSignedUp ? <Redirect to="/" /> : ''}
            <form onSubmit={submitHandler}>
                <Input type="text" name="name" onChange={changeHandler} placeholder="Full-Name" required /><br />
                <Input type="email" name="email" onChange={changeHandler} placeholder="email" required /><br />
                <Input type="password" name="password" onChange={changeHandler} placeholder="password" required /><br />
                <p> {message ? message : ''}</p>
                <Button type="submit">Signup </Button><br />
                <a href="http://localhost:2000/api/user/auth/facebook">
                    <Button>
                        <FacebookIcon />SignUp with Facebook
                    </Button>
                </a>
            </form>
        </div>
    )
}
