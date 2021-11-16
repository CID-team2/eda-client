import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL_BASE } from './';
import * as Charts from '../charts';

function Statistic({ featureViewName, featureName }) {
    const [basicLoading, setBasicLoading] = useState(false);
    const [chartLoading, setChartLoading] = useState(false);
    const [basicStat, setBasicStat] = useState(null);
    const [chartStat, setChartStat] = useState(null);
    const [chartType, setChartType] = useState(null);

    useEffect(() => {
        async function getBasicStatistic() {
            setBasicLoading(true);
            try {
                const response = await axios.get(
                    `${URL_BASE}/feature-views/${featureViewName}/statistic?feature=${featureName}`
                );
                setBasicStat(response.data);
            } catch (e) {
                setBasicLoading(false);
                return <>Basic Statistic Error!</>
            }
            setBasicLoading(false);
        };
        getBasicStatistic();
    }, [featureViewName, featureName]);

    useEffect(() => {
        async function getChartStatistic() {
            setChartLoading(true);
            try {
                if (chartType) {
                    const response = await axios.get(
                        `${URL_BASE}/feature-views/${featureViewName}/statistic?feature=${featureName}&statistic=${chartType}`
                    );
                    setChartStat(response.data);
                }
            } catch (e) {
                setChartLoading(false);
                return <>Chart Statistic Error!</>
            }
            setChartLoading(false);
        };
        getChartStatistic();
    }, [featureViewName, featureName, chartType]);

    const handleChartChange = (type) => {
        setChartStat(null);
        setChartType(type);
    }

    return(
        <>
            {/* TODO: chart options (e.g., a dropdown menu) */}
            {/* an array of buttons for now... */}
            <p>
                <button onClick={() => handleChartChange('boxplot')}>
                    Boxplot
                </button>
                <button onClick={() => handleChartChange('histogram')}>
                    Histogram
                </button>
            </p>
            <>
                {basicLoading ? <>Loading basic statistic...</> :
                    basicStat && <>
                        {Object.keys(basicStat).map((stat) =>
                            <div>
                                <strong>{stat}: </strong>
                                {basicStat[stat] !== null ? basicStat[stat] : 'Unknown'}
                            </div>
                        )}
                    </>
                }
            </>
            <>
                {chartLoading ? <>Loading chart...</> :
                    chartStat &&
                        <div>
                            {chartType === 'boxplot' && <Charts.Boxplot dict={chartStat} />}
                            {chartType === 'histogram' && <Charts.Histogram dict={chartStat} />}
                        </div>
                }
            </>
        </>
    );
}

export default Statistic;
