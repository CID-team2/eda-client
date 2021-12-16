import React from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';
import { URL_BASE } from './';
import { Table } from 'semantic-ui-react';

async function getDatasetInfoExamples({ datasetName }) {
    const resp_info = await axios.get(
        `${URL_BASE}/datasets/${datasetName}`
    );
    const resp_exmp = await axios.get(
        `${URL_BASE}/datasets/${datasetName}/example?count=3`
    );
    return { info: resp_info.data, exmp: resp_exmp.data }
}

function DatasetPreview({ datasetInfo, dataSamples }) {
    const columns = datasetInfo.columns;
    return(
        <>
            <h2>{datasetInfo.name}</h2>
            <div>
                <strong># records: </strong>
                {datasetInfo.num_records}
            </div>
            <h3>Columns</h3>
            <Table definition>
                <Table.Header>
                    <Table.Row>
                        <Table.Cell>Column Name</Table.Cell>
                        <Table.HeaderCell>Data Type</Table.HeaderCell>
                        <Table.HeaderCell colspan='3'>Examples</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {columns.map(column => (
                    <Table.Row key={column.name}>
                        <Table.Cell>{column.name}</Table.Cell>
                        <Table.Cell>{column.data_type}</Table.Cell>
                        {dataSamples[column.name].map(value => (
                            <Table.Cell>{value}</Table.Cell>
                            ))}
                    </Table.Row>
                ))}
                </Table.Body>
                
            </Table>
            <div>
                <strong>Source: </strong>
                {datasetInfo.source || 'Unknown'}
            </div>
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