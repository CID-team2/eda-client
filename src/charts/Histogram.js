import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

function getIntervalList(boundaries) {
    let intervalList = [];
    for (let i = 0; i < boundaries.length - 1; i++) {
        intervalList.push(`${boundaries[i]}~${boundaries[i+1]}`);
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
            xAxis: {
                categories: getIntervalList(dict.boundaries)
            },
            plotOptions: {
                series: {
                    pointPadding: 0,
                    groupPadding: 0,
                    borderWidth: 0,
                    shadow: false
                }
            },
            series: dict.numbers
        }}
    />);
}

export default Histogram;
