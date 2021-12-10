import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const BarChart = ({ dict }) => {
    if (dict.categories.length === 0)
        return null;
    return(<HighchartsReact highcharts={Highcharts}
        options={{
            chart: {
                type: 'bar'
            },
            title: {
                text: null
            },
            xAxis: {
                categories: dict.categories
            },
            yAxis: {
                title: {
                    text: `<b>others_count</b>: ${dict.others_count} /\
                           <b>unique_count</b>: ${dict.unique_count}`,
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                enabled: false
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        inside: true
                    }
                }
            },
            series: [{
                data: dict.numbers,
                showInLegend: false
            }]
        }}
    />);
}

export default BarChart;
