import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL_BASE } from './';
import Boxplot from '../charts/Chart.js';

function Statistic({ match, location }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const featureViewName = match.params.featureviewname;
                const request = `${featureViewName}/statistic${location.search}`;
                const response = await axios.get(
                    `${URL_BASE}/feature-views/${request}`
                );
                setData(response.data);
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
        const basic = data.statistics.basic;
        return(
            <>
                <h4>Null count: {data.null_count}</h4>
                {Object.keys(basic).map((stat) =>
                    <h4 key={stat}>
                        {stat}: {basic[stat] || 'Unknown'}
                    </h4>
                )}
                <Boxplot dict={data.statistics.boxplot} />
            </>
        );
    }
    return null;
}

export default Statistic;