import React from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';

async function getFeatureViewInfo({ name }) {
    const resp = await axios.get(
        `http://3.19.199.190:8080/api/v1/feature-views/${name}`
    );
    return resp.data;
}

function FeatureViewInfo({ name }) {

    const { data: featureView, error, isLoading } = useAsync({
        promiseFn: getFeatureViewInfo,
        name,
        watch: name
    });

    if (isLoading) return <div>Loading FeatureView Info...</div>;
    if (error) return <div>FeatureViewInfo Error!</div>;
    if (featureView) return(
        <div>
            <h2>{name}</h2>
            <h3>Features</h3>
            <table border='1'>
                <th>Name</th>
                <th>Dataset</th>
                <th>Column</th>
                <th>Data Type</th>
                <th>Feature Type</th>
                {featureView.features.map(feature => (
                    <tr>
                        <td>{feature.name}</td>
                        <td>{feature.dataset_name}</td>
                        <td>{feature.column_name}</td>
                        <td>{feature.data_type}</td>
                        <td>{feature.feature_type}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
    return null;
}

export default FeatureViewInfo;