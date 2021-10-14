import React, { useState } from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';
import FeatureViewInfo from './FeatureViewInfo';

async function getFeatureViews() {
    const resp = await axios.get(
        `http://3.19.199.190:8080/api/v1/feature-views`
    );
    return resp.data;
}

function FeatureViews() {
    const [featureViewName, setFeatureViewName] = useState(null);
    const { data: featureViews, error, isLoading } = useAsync({
        promiseFn: getFeatureViews
    });

    if (isLoading) return <div>Loading FeatureViews...</div>;
    if (error) return <div>FeatureViews Error!</div>;
    if (featureViews) return(
        <>
            <ul>
                {featureViews.map(featureView => (
                    <li
                        key={featureView}
                        onClick={() => setFeatureViewName(featureView)}
                        style={{ cursor: 'pointer' }}
                    >
                        {featureView}
                    </li>
                ))}
            </ul>
            <p>
                {featureViewName && <FeatureViewInfo name={featureViewName}/>}
            </p>
        </>
    );
    return null;
}

export default FeatureViews;