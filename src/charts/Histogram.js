import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

function getIntervalList(boundaries) {
    intervalList = []
    for (let i = 0; i < boundaries.length-1; i++) {
        intervalList.push(`${boundaries[i]}~${boundaries[i+1]}`)
    }
    return intervalList
}

// version without plotting outliers
function Histogram({boundaries, numbers}) {
    return <HighchartsReact highcharts={Highcharts}
    options = {
        {
            chart: {
                type: 'column'
            },
            xAxis: {
                categories: getIntervalList(boundaries)
            },
            plotOptions: {
                series: {
                    pointPadding: 0,
                    groupPadding: 0,
                    borderWidth: 0,
                    shadow: false
                }
            },
            series: [numbers]
        }
    }
    />
}

export default Histogram;