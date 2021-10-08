import React, { useState } from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';

async function getFeatureViews() {
    const resp = await axios.get(
        // `/api/v1/feature-views`
    );
    return resp.data;
}

function FeatureViews() {
    // const [featureviewId, setFeatureviewId] = useState(null);
    const { data: featureviews, error, isLoading } = useAsync({
        promiseFn: getFeatureViews
    });

    if(isLoading) return <div>Loading...</div>;
    if(error) return <div>Error!</div>;
    if(featureviews) return(
        <div>
            <ul>
                {featureviews.map(featureview => (
                    <li>{featureview}</li>
                ))}
            </ul>
        </div>
    );
    return null;
}

export default FeatureViews;