import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Pagination } from '@material-ui/lab';
import { Grid } from '@material-ui/core';
import Cars from './Cars';
import Filter from './Filter';
import { Link } from 'react-router-dom';

export default function Home(props) {
    const [isFiltered, setisFiltered] = useState(false);
    const [cars, setCars] = useState([]);
    const [totalPages, setTotalPages] = useState();
    let currentPage = 1;

    useEffect(() => {
        fetchCars();
    }, [])

    const fetchCars = () => {
        setisFiltered(false);
        axios.get(`/api/cars`)
            .then(res => {
                if (res.status === 200) {
                    setCars(res.data.cars);
                    setTotalPages(res.data.pages);
                }
            });
    }

    const getPageResult = () => {
        axios.get(`api/cars/${currentPage}`)
            .then(res => {
                if (res.status === 200) {
                    setCars(res.data);
                }
            });
    }

    const updateFilter = (filterdCars) => {
        setisFiltered(!isFiltered);
        setCars(filterdCars.cars);
        setTotalPages(filterdCars.pages);
        setisFiltered(true);
    }
    const nonLogedINScreen =
        <div className="nonLogedINScreen">
            <h2>Car Board - <small>Get info about any car </small></h2>
            <h2>Wellcome please <Link to="/login">Login</Link> / <Link to="/signup">Signup</Link></h2>
        </div>
    const logedINScreen =
        <div className="logedINScreen">
            <h2>Car Board - <small>Get info about any car </small></h2>
            <Filter updateFilter={updateFilter} cars={cars} />
            <Cars cars={cars} isFiltered={isFiltered} />
            <Grid container justify="center">
                <Pagination defaultPage={currentPage} count={totalPages} color="secondary" size="large"
                    onChange={(e, page) => {
                        currentPage = page;
                        getPageResult();
                    }} />
            </Grid>
        </div>
    return (
        <div>
            {props.isLogedIN ? logedINScreen : nonLogedINScreen}
        </div>
    )
}
