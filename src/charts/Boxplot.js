import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsMore from 'highcharts/highcharts-more'

HighchartsMore(Highcharts);

const getOutliers = (dict) => {
    let ret = [];
    let outliers = dict.lowerOutliers.concat(dict.upperOutliers);
    let length = outliers.length;
    if (length > 100)
        for (let i = 0; i < length; i += length/100)
            ret.push(outliers[parseInt(i)]);
    else ret = outliers;
    return ret;
}

function Boxplot({ dict }) {
    return(<HighchartsReact highcharts={Highcharts}
        options={{
            chart: {
                type: 'boxplot'
            },
            title: {
                text: undefined
            },
            legend: {
                enabled: false
            },
            xAxis: {
                visible: false
            },
            yAxis: {
                title: {
                    text: undefined
                }
            },
            series: [{
                name: undefined,
                data: [
                    [dict.lowerWhisker, dict.q1, dict.q2, dict.q3, dict.upperWhisker]
                ],
                tooltip: {
                    headerFormat: ''
                }
            }, {
                name: 'Outliers',
                color: Highcharts.getOptions().colors[0],
                type: 'scatter',
                data:  // x, y positions where 0 is the first category
                    getOutliers(dict).map(x => [0, x])
                ,
                marker: {
                    fillColor: 'white',
                    lineWidth: 1,
                    lineColor: Highcharts.getOptions().colors[0]
                },
                tooltip: {
                    pointFormat: 'Observation: {point.y}'
                }
            }]
        }}
    />);
}

export default Boxplot;
