import React from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';
import { useAsync } from 'react-async';
import { URL_BASE, DatasetInfo } from './';

async function getDatasets() {
    const resp = await axios.get(
        `${URL_BASE}/datasets`
    );
    return resp.data;
}

function DatasetList({ datasets }) {
    return(
        <>
            <h1>Datasets</h1>
            <ul>
                {datasets.map(datasetName => (
                    <li key={datasetName}>
                        <Link to={`/datasets/${datasetName}`}>
                            {datasetName}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

function Datasets({ match }) {
    const { data: datasets, error, isLoading } = useAsync({
        promiseFn: getDatasets
    });

    if(isLoading) return <>Loading Datasets...</>;
    if(error) return <>Datasets Error!</>;
    if(datasets) return(
        <>
            <Route
                exact path={match.path}
                render={() => <DatasetList datasets={datasets}/>}
            />
            <Route
                path={`${match.path}/:dataset_name`}
                component={DatasetInfo}
            />
        </>
    );
    return null;
}

export default Datasets;