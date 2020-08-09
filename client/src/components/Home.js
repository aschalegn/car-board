import React, { useState } from 'react'

import Cars from './Cars';
import Filtered from './Filtered';
import Filter from './Filter';

export default function HOME() {
    const [isFiltered, setisFiltered] = useState(false);
    
    const updateFilter = () => {
        setisFiltered(!isFiltered);
    }

    return (
        <div>
            <Filter updateFilter={updateFilter} />
        </div>
    )
}
