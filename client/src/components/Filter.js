/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FormControl, Select, MenuItem, InputLabel, Button, Slider, Typography } from '@material-ui/core';

export default function Filter(props) {
    const [manifucturers, setManifucturers] = useState([]);
    const [years, setYears] = useState([]);
    const [formData, setFormData] = useState({});
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);

    //Fetch all the availeable manifacurers
    const fetchMans = () => {
        axios.get('https://private-anon-ab9cc9d997-carsapi1.apiary-mock.com/manufacturers')
            .then(res => {
                if (res.status === 200) {
                    const manNames = res.data.map(man => {
                        return man.name;
                    });
                    setManifucturers(manNames);
                }
            });
    }

    //Fetch all the availeable years  
    const getMaxMinPricesAndYears = () => {
        const years = [];
        let lMinPrice = 0, lMaxPrice = 0;
        axios.get('https://private-anon-ab9cc9d997-carsapi1.apiary-mock.com/cars')
            .then(res => {
                if (res.status === 200) {
                    res.data.forEach(car => {
                        //push to array if not in the array
                        years.includes(car.year) ? '' : years.push(car.year);
                        //if smaller the min set as min
                        if (car.price < lMinPrice) lMinPrice = car.price;
                        //if bigger the max set as max
                        else if (car.price > lMaxPrice) lMaxPrice = car.price;
                    });
                    //Update the state
                    setMinPrice(lMinPrice);
                    setMaxPrice(lMaxPrice);
                    setYears(years.sort());
                                }
            });
    }

    //Update the state
    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    //get the filtered cars
    const filter = (e) => {
        e.preventDefault();
        axios.get('api/cars/filter/params', { params: formData })
            .then(res => {
                if (res.status === 200) {
                    props.updateFilter(res.data);
                }
            });
    }

    useEffect(() => {
        fetchMans();
        getMaxMinPricesAndYears();
    }, []);

    return (
        <div>
            <form onSubmit={(e) => { filter(e) }} id="filterForm">
                <FormControl>
                    <InputLabel >Filter By:</InputLabel>
                </FormControl>
                <FormControl>
                    <InputLabel disabled value=""> Maker</InputLabel>
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
                    <Select onChange={changeHandler} name="year">
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {years.map((year, i) =>
                            <MenuItem key={i} value={year}>{year}</MenuItem >
                        )}
                    </Select>
                </FormControl>
                <FormControl>
                    <Typography> Min Price: {formData.minPrice}</Typography>
                    <Slider name="minPrice" min={minPrice} max={maxPrice}
                        onChangeCommitted={(e, val) => { setFormData({ ...formData, ['minPrice']: val }) }}
                        defaultValue={minPrice} />
                </FormControl>
                <FormControl>
                    <Typography> Max Price: {formData.maxPrice} </Typography>
                    <Slider name="maxPrice" min={minPrice} max={maxPrice}
                        onChangeCommitted={(e, val) => { setFormData({ ...formData, ['maxPrice']: val }) }}
                        defaultValue={maxPrice} />
                </FormControl>
                <Button type="submit" variant="contained" color="primary">Search</Button>
            </form>
        </div>
    );
}