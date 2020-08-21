import React, { useState } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Input, Button } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import './user.css';
export default function LogIn(props) {
    const [formData, setFormData] = useState({});
    const [isLogedIn, setIsLogedIn] = useState(false);
    const [message, setMessage] = useState('');
    const changeHandler = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const submitHandler = e => {
        e.preventDefault();
        if (formData.email && formData.password) {
            axios.get(`/api/user/login/${formData.email}/${formData.password}`)
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        setIsLogedIn(true);
                        props.logIN();
                        
                    };
                    if (res.status === 202) setMessage("This email not in the system pleas signup");
                });
        }
    }

    return (
        <div className="Login">
            {isLogedIn ? <Redirect to="/" /> : ''}
            <form onSubmit={submitHandler}>
                <Input type="email" name="email" onChange={changeHandler} placeholder="Email" /> <br />
                <Input type="password" name="password" onChange={changeHandler} placeholder="Password" /> <br />
                <p>{message ? message : ''}</p>
                <Button type="submit">Login</Button> <br />
                <a href="http://localhost:2000/api/user/auth/facebook">
                    <Button>
                        <FacebookIcon />Login with Facebook
                 </Button>
                </a>
            </form>
        </div>
    );
}