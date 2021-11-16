import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

function getIntervalList(boundaries) {
    let intervalList = [];
    for (let i = 0; i < boundaries.length - 1; i++) {
        intervalList.push(`${boundaries[i]} ~ ${boundaries[i+1]}`);
    }
    return intervalList;
}

// version without plotting outliers
function Histogram({ dict }) {
    return(<HighchartsReact highcharts={Highcharts}
        options={{
            chart: {
                type: 'column'
            },
            title: {
                text: undefined
            },
            xAxis: {
                categories: getIntervalList(dict.boundaries)
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    shadow: false,
                    dataLabels: {
                        enabled: true,
                        inside: true
                    }
                }
            },
            tooltip: {
                enabled: false
            },
            series: [{
                data: dict.numbers,
                showInLegend: false
            }]
        }}
    />);
}

export default Histogram;
