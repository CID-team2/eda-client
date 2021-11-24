import React from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';
import { useAsync } from 'react-async';
import { URL_BASE, FeatureViewInfo, FeatureViewCreate } from './';

async function getFeatureViews() {
    const resp = await axios.get(
        `${URL_BASE}/feature-views`
    );
    return resp.data;
}

function FeatureViewList({ featureViews }) {
    return(
        <>
            <h1>Feature Views</h1>
            <ul>
                {featureViews.map(featureViewName => (
                    <li key={featureViewName}>
                        <Link to={`/feature-views/info/${featureViewName}`}>
                            {featureViewName}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

function FeatureViews({ match }) {
    const { data: featureViews, error, isLoading } = useAsync({
        promiseFn: getFeatureViews
    });

    if (isLoading) return <>Loading FeatureViews...</>;
    if (error) return <>FeatureViews Error!</>;
    if (featureViews) return(
        <>
            <Route
                exact path={match.path}
                render={() => <FeatureViewList featureViews={featureViews}/>}
            />
            <Route
                exact path={match.path}
                render={() => <p>
                    <Link to='/feature-views/create'>
                        <button>Create a Feature View</button>
                    </Link>
                </p>}
            />
            <Route
                path={`${match.path}/info/:feature_view_name`}
                component={FeatureViewInfo}
            />
            <Route
                path={`${match.path}/create`}
                component={FeatureViewCreate}
            />
        </>
    );
    return null;
}

export default FeatureViews;
