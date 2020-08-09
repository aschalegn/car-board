import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Pagination } from '@material-ui/lab';
import { Table, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core';

export default function Cars(props) {
    const [cars, setcars] = useState([]);
    const [filted, setFilted] = useState([])
    const [totalPages, settotalPages] = useState();
    let currentPage = 1;

    const fetchCars = () => {
        axios.get(`/cars/${currentPage}`)
            .then(res => {
                if (res.status === 200) {
                    setcars(res.data);
                }
            });
    }

    const getTotalPages = () => {
        axios.get("/cars")
            .then(res => {
                if (res.status === 200) {
                    settotalPages(res.data);
                }
            });
    }

    useEffect(() => {
        fetchCars();
        getTotalPages();
    }, []);

    return (
        <div>
            <Table style={{ width: "85vw", margin: "auto" }}>
                <TableHead>
                    <TableRow>
                        <TableCell><b></b></TableCell>
                        <TableCell><b> Model </b></TableCell>
                        <TableCell><b>Price </b></TableCell>
                        <TableCell><b>Year </b></TableCell>
                        <TableCell><b>Manufacturer </b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cars.map(car =>
                        <TableRow key={car.id}>
                            <TableCell>
                                <img src={car.img_url} alt={car.model} height="100px" width="150px" />
                            </TableCell>
                            <TableCell>{car.model}</TableCell>
                            <TableCell>{car.price}</TableCell>
                            <TableCell>{car.year}</TableCell>
                            <TableCell>{car.make}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Pagination defaultPage={currentPage} count={totalPages} color="secondary" size="large"
                onChange={(e, page) => {
                    currentPage = page;
                    fetchCars();
                }} />
        </div>
    );
}
