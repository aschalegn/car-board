import React, { useState } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default function LogIn() {
    const [formData, setFormData] = useState({});
    const [isLogedIn, setIsLogedIn] = useState(false);
    const [message, setMessage] = useState('');
    const changeHandler = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const submitHandler = e => {
        e.preventDefault();
        console.log(formData);
        if (formData.email && formData.password) {
            axios.get(`/api/user/login/${formData.email}/${formData.password}`)
                .then(res => {
                    console.log(res);
                    if (res.status === 200) setIsLogedIn(true);
                    if (res.status === 202) setMessage(res.data);
                });
        }
    }

    return (
        <form onSubmit={submitHandler}>
            {isLogedIn ? <Redirect to="/cars" /> : ''}
            <input type="email" name="email" onChange={changeHandler} placeholder="Email" />
            <input type="password" name="password" onChange={changeHandler} placeholder="Password" />
            <input type="submit" value="Login" />
            {message ? message : ''}
        </form>
    );
}