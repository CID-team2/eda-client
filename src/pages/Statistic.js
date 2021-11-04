import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL_BASE } from './';
// import Boxplot from '../charts/Chart.js';

function Statistic({ match, location }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    // const [chart, setChart] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `${URL_BASE}/${match.url}${location.search}`
                );
                setData(response.data);
                // TODO: parse query string and set chart state
            } catch (e) {
                // console.log(e);
                return <>Statistic Error!</>
            }
            setLoading(false);
        };
        fetch();
    }, [match, location]);

    if (loading) return <>Loading Statistic...</>;
    if (data) {
        return(
            <>
                {Object.keys(data).map((stat) =>
                    <h4 key={stat}>
                        {stat}: {data[stat] || 'Unknown'}
                    </h4>
                )}
                {/* <Boxplot dict={data} /> */}
            </>
        );
    }
    return null;
}

export default Statistic;