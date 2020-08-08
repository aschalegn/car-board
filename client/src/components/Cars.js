import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Pagination } from '@material-ui/lab';
import { Table, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core';

export default function Cars() {
    const [cars, setcars] = useState([]);
    const [totalPages, settotalPages] = useState(10);
    const [currentPage, setcurrentPage] = useState(2);

    const fetchCars = () => {
        axios.get(`/cars/${currentPage}`)
            .then(res => {
                if (res.status === 200) {
                    setcars(res.data);
                }
            });
    }
    useEffect(() => {
        fetchCars();
    }, []);
    return (
        <div>
            <Table style={{ width: "90vw", margin: "auto" }}>
                <TableHead>
                    <TableRow>
                        <TableCell><b>Image</b></TableCell>
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
            <Pagination defaultPage={currentPage} count={totalPages} color="secondary" onChange={(e, page) => {
                setcurrentPage(page);
                fetchCars();
                console.log(page);
            }} />
        </div>
    );
}
