import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';

export default function Filter() {
    const initialState = {
        year: '',
        manifacture: ''
    }
    
    const [formData, setformData] = useState(initialState)
    const [manifucturers, setmanifucturers] = useState([]);

    const fetchMans = () => {
        axios.get('https://private-anon-ab9cc9d997-carsapi1.apiary-mock.com/manufacturers')
            .then(res => {
                if (res.status === 200) {
                    const manNames = res.data.map(man => {
                        return man.name;
                    });
                    setmanifucturers(manNames);
                }
            });
    }

    const changeHandler = (e) => {
        initialState[e.target.name] = e.target.value;
        setformData(initialState);
    }

    const filter = (e) => {
        e.preventDefault();
        axios.get('/cars/filter/p', { params: initialState })
            .then(res => {
                if (res.status === 200) {
                    console.log("Filterd", res.data);
                }
            });
    }

    useEffect(() => {
        fetchMans();
    }, []);

    return (
        <div>
            <h3> Filter By:</h3>
            <form onSubmit={(e) => { filter(e) }}>
                <FormControl>
                    <InputLabel disabled value=""> Maker</InputLabel  >
                    <Select onChange={changeHandler} name="manifacture">
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {manifucturers.map((manifacture, i) =>
                            <MenuItem key={i} value={manifacture}>{manifacture}</MenuItem >
                        )}
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel> Year </InputLabel>
                    <Select onChange={changeHandler} name="year" >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="2015">2015</MenuItem >
                        <MenuItem value="2016">2016</MenuItem >
                        <MenuItem value="2017">2017</MenuItem >
                    </Select>
                </FormControl>
                <button type="submit">Search</button>
            </form>
        </div>
    );
}
