import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL_BASE } from './';
import * as Charts from '../charts';
import { Button } from 'semantic-ui-react';

const chartTypeToParam = {
    'box':      'boxplot',
    'hist':     'histogram',
    'bar':      'barplot',
    'pie':      'barplot',
    // 'heatmap':  'corr_matrix',
    // 'scatter':  'scatter_plot'
};

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
    `${URL_BASE}/feature-views/${featureViewName}/statistic?feature=${featureName}&statistic=${chartTypeToParam[chartType]}`
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
            <>
                <Button.Group widths='4'>
                    <Button onClick={() => handleChartChange('box')}>
                        Boxplot
                    </Button>
                    <Button onClick={() => handleChartChange('hist')}>
                        Histogram
                    </Button>
                    <Button onClick={() => handleChartChange('bar')}>
                        Bar
                    </Button>
                    <Button onClick={() => handleChartChange('pie')}>
                        Pie
                    </Button>
                </Button.Group>
            </>
            <>
                {chartLoading ? <>Loading chart...</> :
                    chartStat &&
                        <div>
                            {chartType === 'box' && <Charts.Boxplot dict={chartStat} />}
                            {chartType === 'hist' && <Charts.Histogram dict={chartStat} />}
                            {chartType === 'bar' && <Charts.BarChart dict={chartStat} />}
                            {chartType === 'pie' && <Charts.PieChart dict={chartStat} />}
                        </div>
                }
            </>
            <>
                {basicLoading ? <>Loading basic statistic...</> :
                    basicStat && <>
                        {Object.keys(basicStat).map((stat) =>
                            <div key={stat}>
                                <strong>{stat}: </strong>
                                {basicStat[stat] !== null ? basicStat[stat] : 'Unknown'}
                            </div>
                        )}
                    </>
                }
            </>
        </>
    );
}

export default Statistic;
