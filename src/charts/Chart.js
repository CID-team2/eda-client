import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import axios from 'axios'
import HighchartsMore from 'highcharts/highcharts-more'

HighchartsMore(Highcharts);

function getChart() {
    return {
        chart: {
            type: 'boxplot'
        },
    
        title: {
            text: 'Highcharts Box Plot Example'
        },
    
        legend: {
            enabled: false
        },
    
        xAxis: {
            categories: ['1'],
            title: {
                text: 'Experiment No.'
            }
        },
    
        yAxis: {
            title: {
                text: 'Observations'
            }
        },
    
        series: [{
            name: 'Observations',
            data: [
                [760, 801, 848, 895, 965]
            ],
            tooltip: {
                headerFormat: '<em>Experiment No {point.key}</em><br/>'
            }
        }, {
            name: 'Outliers',
            color: Highcharts.getOptions().colors[0],
            type: 'scatter',
            data: [ // x, y positions where 0 is the first category
                [0, 644]
            ],
            marker: {
                fillColor: 'white',
                lineWidth: 1,
                lineColor: Highcharts.getOptions().colors[0]
            },
            tooltip: {
                pointFormat: 'Observation: {point.y}'
            }
        }]
      }
}

function Boxplot (){
    return (
        <HighchartsReact highcharts={Highcharts} options= {getChart()}/>
    )
}
export default Boxplot;