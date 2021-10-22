import React from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';
import { useAsync } from 'react-async';
import Statistic from './Statistic';

async function getFeatureViewInfo({ featureViewName }) {
    const resp = await axios.get(
        `http://3.19.199.190:8080/api/v1/feature-views/${featureViewName}`
    );
    return resp.data;
}

function FeatureTable({ featureViewInfo }) {
    const featureViewName = featureViewInfo.name;
    const features = featureViewInfo.features;
    const columns = [
        'Name',
        'Dataset',
        'Column',
        'Data Type',
        'Feature Type'
    ];
    return(
        <>
            <h2>{featureViewName}</h2>
            <h3>Features</h3>
            <table border='1'>
                <thead>
                    <tr>
                        {columns.map((column) =>
                            <th key={column}>{column}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {features.map(feature => (
                        <tr key={feature.name}>
                            <td>
                                <Link to={`/featureviews/${featureViewName}/statistic?feature=${feature.name}`}>
                                    {feature.name}
                                </Link>
                            </td>
                            <td>{feature.dataset_name}</td>
                            <td>{feature.column_name}</td>
                            <td>{feature.data_type}</td>
                            <td>{feature.feature_type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

function FeatureViewInfo({ match }) {
    const featureViewName = match.params.featureviewname;

    const { data: featureViewInfo, error, isLoading } = useAsync({
        promiseFn: getFeatureViewInfo,
        featureViewName
    });

    if (isLoading) return <>Loading FeatureViewInfo...</>;
    if (error) return <>FeatureViewInfo Error!</>;
    if (featureViewInfo) return(
        <>
            <FeatureTable featureViewInfo = {featureViewInfo}/>
            <Route
                path={`${match.path}/statistic`}
                component={Statistic}
            />
        </>
    );
    return null;
}

export default FeatureViewInfo;