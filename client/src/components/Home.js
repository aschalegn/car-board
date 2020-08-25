import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Pagination } from '@material-ui/lab';
import { Grid } from '@material-ui/core';
import Cars from './Cars';
import Filter from './Filter';

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
        <div>
            <h2>Wellcome to car board to see the car details pleas login</h2>
        </div>
    const logedINScreen = <div>
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
