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
    'heatmap':  'corr_matrix',
    // 'scatter':  'scatter_plot'
};
const singleFeatureChart = ['box', 'hist', 'bar', 'pie'];

function Statistic({ featureViewName, featureName, featureNames }) {
    const [basicLoading, setBasicLoading] = useState(false);
    const [chartLoading, setChartLoading] = useState(false);
    const [basicStat, setBasicStat] = useState(null);
    const [chartStat, setChartStat] = useState(null);
    const [chartType, setChartType] = useState(null);

    useEffect(() => {
        async function getBasicStatistic() {
            if (!featureName)
                return;
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
                if (singleFeatureChart.includes(chartType)) {
                    if (!featureName) {
                        setChartLoading(false);
                        return;
                    }
                    const response = await axios.get(
    `${URL_BASE}/feature-views/${featureViewName}/statistic?feature=${featureName}&statistic=${chartTypeToParam[chartType]}`
                    );
                    setChartStat(response.data);
                }
                else if (chartType === 'heatmap') {
                    if (featureNames.size < 2) {
                        setChartLoading(false);
                        return;
                    }
                    let url = `${URL_BASE}/feature-views/${featureViewName}/statistic?`;
                    featureNames.forEach(name => {
                        url = url + `feature=${name}&`;
                    });
                    url = url + `statistic=${chartTypeToParam[chartType]}`;
                    const response = await axios.get(url);
                    setChartStat(response.data);
                }
                else if (chartType === 'scatter') {
                    if (featureNames.size !== 2) {
                        setChartLoading(false);
                        return;
                    }
                    let url = `${URL_BASE}/feature-views/${featureViewName}/example?`;
                    featureNames.forEach(name => {
                        url = url + `feature=${name}&`;
                    });
                    url = url + `count=100&random=true`;
                    const response = await axios.get(url);
                    setChartStat(response.data);
                }
            } catch (e) {
                setChartLoading(false);
                return <>Chart Statistic Error!</>
            }
            setChartLoading(false);
        };
        getChartStatistic();
    }, [featureViewName, featureName, featureNames, chartType]);

    const handleChartChange = (type) => {
        setChartStat(null);
        setChartType(type);
    }

    return(
        <>
            <>
                <Button.Group widths='6'>
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
                    <Button onClick={() => handleChartChange('heatmap')}>
                        Heatmap
                    </Button>
                    <Button onClick={() => handleChartChange('scatter')}>
                        Scatter
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
                            {chartType === 'heatmap' && <Charts.Heatmap dict={chartStat} />}
                            {chartType === 'scatter' && <Charts.ScatterChart dict={chartStat} />}
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
