import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL_BASE } from './';
// import Boxplot from '../charts/Chart.js';

function Statistic({ featureViewName, featureName, chartType }) {
    const basicStatURL = `${URL_BASE}/feature-views/${featureViewName}/statistic?feature=${featureName}`;
    const chartStatURL = chartType ? `${basicStatURL}&statistic=${chartType}` : null;

    const [loading, setLoading] = useState(false);
    const [basicStat, setBasicStat] = useState(null);
    const [chartStat, setChartStat] = useState(null);

    useEffect(() => {
        async function getBasicStatistic() {
            setLoading(true);
            try {
                const response = await axios.get(basicStatURL);
                setBasicStat(response.data);
            } catch (e) {
                return <>Basic Statistic Error!</>
            }
            setLoading(false);
        };
        getBasicStatistic();
    }, [basicStatURL]);

    useEffect(() => {
        async function getChartStatistic() {
            if (chartStatURL) {
                setLoading(true);
                try {
                    const response = await axios.get(chartStatURL);
                    setChartStat(response.data);
                } catch (e) {
                    return <>Chart Statistic Error!</>
                }
                setLoading(false);
            }
        };
        getChartStatistic();
    }, [chartStatURL]);

    if (loading) return <>Loading Statistic...</>;
    if (basicStat) {
        return(
            <>
                {Object.keys(basicStat).map((stat) =>
                    <h4 key={stat}>
                        {stat}: {basicStat[stat] || 'Unknown'}
                    </h4>
                )}
                {/* TODO: render chart component */}
            </>
        );
    }
    return null;
}

export default Statistic;