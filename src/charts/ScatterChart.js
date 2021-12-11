import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const getData = (dict, X, Y) => {
    const N = dict[X].length;
    let data = [];
    for (let i = 0; i < N; i++)
        data.push( [parseFloat(dict[X][i]), parseFloat(dict[Y][i])] );
    return data;
}

const ScatterChart = ({ dict }) => {
    console.log(dict);
    const features = Object.keys(dict),
            X = features[0], Y = features[1],
            N = dict[X].length;

    return(<HighchartsReact highcharts={Highcharts}
        options={{
            chart: {
                type: 'scatter',
                zoomType: 'xy'
            },
            title: {
                text: null
            },
            subtitle: {
                text: `Showing <b>${N}</b> data points`
            },
            xAxis: {
                title: {
                    text: X
                },
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true
            },
            yAxis: {
                title: {
                    text: Y
                },
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true
            },
            plotOptions: {
                scatter: {
                    marker: {
                        radius: 5,
                        states: {
                            hover: {
                                enabled: true,
                                lineColor: 'rgb(100,100,100)'
                            }
                        }
                    },
                    states: {
                        hover: {
                            marker: {
                                enabled: false
                            }
                        }
                    },
                    tooltip: {
                        headerFormat: null,
                        pointFormat: '<b>{point.x}</b>, <b>{point.y}</b>'
                    }
                }
            },
            series: [{
                data: getData(dict, X, Y),
                showInLegend: false
            }]
        }}
    />);
}

export default ScatterChart;
