import React, { useState } from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';
import { URL_BASE, Statistic } from './';

async function getFeatureViewInfo({ featureViewName }) {
    const resp = await axios.get(
        `${URL_BASE}/feature-views/${featureViewName}`
    );
    return resp.data;
}

function FeatureViewInfo({ match }) {
    const featureViewName = match.params.feature_view_name;
    const columns = [
        'Name',
        'Dataset',
        'Column',
        'Data Type',
        'Feature Type'
    ];

    const [featureName, setFeatureName] = useState(null);
    const [chartType, setChartType] = useState(null);
    
    const { data: featureViewInfo, error, isLoading } = useAsync({
        promiseFn: getFeatureViewInfo,
        featureViewName
    });

    if (isLoading) return <>Loading FeatureViewInfo...</>;
    if (error) return <>FeatureViewInfo Error!</>;
    if (featureViewInfo) return(
        <>
            <h2>{featureViewInfo.name}</h2>
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
                    {featureViewInfo.features.map(feature => (
                        <tr key={feature.name}>
                            <td>
                                <button onClick={() => setFeatureName(feature.name)} >
                                    {feature.name}
                                </button>
                            </td>
                            <td>{feature.dataset_name}</td>
                            <td>{feature.column_name}</td>
                            <td>{feature.data_type}</td>
                            <td>{feature.feature_type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {/* TODO: chart options (e.g., a dropdown menu) */}
            {/* an array of buttons for now... */}
            <div>
                <button onClick={() => setChartType('boxplot')}>
                    Boxplot
                </button>
                <button onClick={() => setChartType('histogram')}>
                    Histogram
                </button>
            </div>

            {featureName &&
                <Statistic
                    featureViewName={featureViewName}
                    featureName={featureName}
                    chartType={chartType}
                />
            }
        </>
    );
    return null;
}

export default FeatureViewInfo;