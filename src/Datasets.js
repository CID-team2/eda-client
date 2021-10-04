import React, { useState } from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';

async function getDatasets() {
    const resp = await axios.get(
        // `/api/v1/datasets`
    );
    return resp.data;
}

function Datasets() {
    // const [datasetId, setDatasetId] = useState(null);
    const { data: datasets, error, isLoading } = useAsync({
        promiseFn: getDatasets
    });

    if(isLoading) return <div>Loading...</div>;
    if(error) return <div>Error!</div>;
    if(datasets) return(
        <div>
            <ul>
                {datasets.map(dataset => (
                    <li>{dataset}</li>
                ))}
            </ul>
        </div>
    );
    return null;
}

export default Datasets;