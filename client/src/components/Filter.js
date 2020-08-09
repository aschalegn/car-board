import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function Filter() {
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

    const byYear = (year) => {
        axios.get(`/cars/filter/${year}`)
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data);
                }
            });
    }

    useEffect(() => {
        fetchMans();
    }, []);

    return (
        <div>
            Filter By:
            <select>
                {manifucturers.map((manifacture, i) =>
                    <option key={i} value={manifacture}>{manifacture}</option>
                )}
            </select>

            <select onChange={(e) => { byYear(e.target.value) }}>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
            </select>
        </div>
    );
}
