import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Pagination } from '@material-ui/lab';
import { Grid } from '@material-ui/core';
import Cars from './Cars';
import Filter from './Filter';

export default function HOME() {
    const [isFiltered, setisFiltered] = useState(false);
    const [cars, setCars] = useState([]);
    const [totalPages, setTotalPages] = useState();
    let currentPage = 1;

    useEffect(() => {
        // pageResult();
        fetchCars();
    }, [])

    const fetchCars = () => {
        axios.get(`/cars`)
            .then(res => {
                if (res.status === 200) {
                    setCars(res.data.cars);
                    setTotalPages(res.data.pages);
                }
            });
    }

    const pageResult = () => {
        axios.get(`/cars/${currentPage}`)
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

    return (
        <div>
            <Filter updateFilter={updateFilter} />
            <Cars cars={cars} />
            <Grid container justify = "center">
  <Pagination defaultPage={currentPage} count={totalPages} color="secondary" size="large"
                onChange={(e, page) => {
                    currentPage = page;
                    pageResult()
                }} />
</Grid>
            
        </div>
    )
}
