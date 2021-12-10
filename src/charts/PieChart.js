import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PieChart = ({ dict }) => {
    if (dict.categories.length === 0)
        return null;
    return(<HighchartsReact highcharts={Highcharts}
        options={{
            chart: {
                type: 'pie'
            },
            title: {
                text: null
            },
            tooltip: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        format: `<b>{point.name}</b><br/>{point.y} ({point.percentage:.2f} %)`
                    }
                }
            },
            series: [{
                data: dict.categories.map((c, i) => {
                    return {
                        name: c,
                        y: dict.numbers[i]
                }}),
                colorByPoint: true
            }]
        }}
    />);
}

export default PieChart;
