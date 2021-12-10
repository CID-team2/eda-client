import React, { useState } from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';
import { URL_BASE, Statistic } from './';
import { Button, Divider, Table } from 'semantic-ui-react';

async function getFeatureViewInfo({ featureViewName }) {
    const resp = await axios.get(
        `${URL_BASE}/feature-views/${featureViewName}`
    );
    return resp.data;
}

function FeatureViewInfo({ match }) {
    const featureViewName = match.params.feature_view_name;

    const [featureName, setFeatureName] = useState(null);
    
    const { data: featureViewInfo, error, isLoading } = useAsync({
        promiseFn: getFeatureViewInfo,
        featureViewName
    });

    if (isLoading) return <>Loading FeatureViewInfo...</>;
    if (error) return <>FeatureViewInfo Error!</>;
    if (featureViewInfo) return(
        <>
            <h2>{featureViewInfo.name}</h2>
            {featureName &&
                <Statistic
                featureViewName={featureViewName}
                featureName={featureName}
                />}
            <Divider />
            <Table celled striped selectable compact>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Dataset</Table.HeaderCell>
                        <Table.HeaderCell>Column</Table.HeaderCell>
                        <Table.HeaderCell>Data Type</Table.HeaderCell>
                        <Table.HeaderCell>Feature Type</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {featureViewInfo.features.map(feature => (
                        <Table.Row
                            key={feature.name}
                            active={feature.name === featureName}
                        >
                            <Table.Cell>
                                <Button
                                    onClick={() => setFeatureName(feature.name)}
                                >
                                    {feature.name}
                                </Button>
                            </Table.Cell>
                            <Table.Cell>{feature.dataset_name}</Table.Cell>
                            <Table.Cell>{feature.column_name}</Table.Cell>
                            <Table.Cell>{feature.data_type}</Table.Cell>
                            <Table.Cell>{feature.feature_type}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </>
    );
    return null;
}

export default FeatureViewInfo;