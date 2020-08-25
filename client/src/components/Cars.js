import React from 'react'
import { Table, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core';

export default function Cars(props) {
    return (
        <div>
            {props.cars.length === 0 ? (props.isFilterd,
                <div>
                    <h3>No Result, </h3>
                    <p>Wait a moment or try diffrent parameters!</p>
                </div>)
                : <Table>
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
                        {props.cars.map(car =>
                            <TableRow key={car.id}>
                                <TableCell>
                                    <img src={car.img_url} alt={car.model} height="100px" width="150px" />
                                </TableCell>
                                <TableCell>{car.model}</TableCell>
                                <TableCell>{car.price}$</TableCell>
                                <TableCell>{car.year}</TableCell>
                                <TableCell>{car.make}</TableCell>
                            </TableRow>
                        )}  
                    </TableBody>
                </Table>
            }
        </div>
    );
}
