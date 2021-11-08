import React from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';
import { URL_BASE } from './';

async function getDatasetInfoExamples({ datasetName }) {
    const resp_info = await axios.get(
        `${URL_BASE}/datasets/${datasetName}`
    );
    const resp_exmp = await axios.get(
        `${URL_BASE}/datasets/${datasetName}/example`
    );
    return { info: resp_info.data, exmp: resp_exmp.data }
}

function DatasetPreview({ datasetInfo, dataSamples }) {
    const columns = datasetInfo.columns;
    console.log(columns);
    return(
        <>
            <h2>{datasetInfo.name}</h2>
            <h3>Source: {datasetInfo.source || 'Unknown'}</h3>
            {/* <h6>Created at: {datasetInfo.created_at || 'Unknown'}</h6> */}
            {/* <h6>Last modified at: {datasetInfo.modified_at || 'Unknown'}</h6> */}
            <h3>Columns</h3>
            <table border='1'>
                {columns.map(column => (
                    <tr key={column.name}>
                        <td>{column.name}</td>
                        {dataSamples[column.name].map(value => (
                            <td>{value}</td>
                        ))}
                    </tr>
                ))}
            </table>
        </>
    );
}

function DatasetInfo({ match }) {
    const datasetName = match.params.dataset_name;

    const { data, error, isLoading } = useAsync({
        promiseFn: getDatasetInfoExamples,
        datasetName
    });

    if (isLoading) return <>Loading DatasetInfo...</>;
    if (error) return <>DatasetInfo Error!</>;
    if (data) return(
        <DatasetPreview
            datasetInfo = {data.info}
            dataSamples = {data.exmp}
        />);
    return null;
}

export default DatasetInfo;