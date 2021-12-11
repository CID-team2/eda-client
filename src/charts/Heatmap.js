import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsHeatmap from 'highcharts/modules/heatmap';

HighchartsHeatmap(Highcharts);

const getPointCategoryName = (point, dimension) => {
    const series = point.series,
          isY = dimension === 'y',
          axis = series[isY ? 'yAxis' : 'xAxis'];
    return axis.categories[point[isY ? 'y' : 'x']];
}

const getData = (dict) => {
    const N = dict.features.length;
    let data = [];
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            data.push( [i, j, dict.matrix[i][j]] );
        }
    }
    return data;
}

const Heatmap = ({ dict }) => {
    if (dict.features.length === 0)
        return null;
    return(<HighchartsReact highcharts={Highcharts}
        options={{
            chart: {
                type: 'heatmap'
            },
            title: {
                text: null
            },
            xAxis: {
                categories: dict.features
            },
            yAxis: {
                categories: dict.features
            },
            colorAxis: {
                min: -1,
                max: 1,
                minColor: Highcharts.getOptions().colors[5],
                maxColor: Highcharts.getOptions().colors[0]
            },
            legend: {
                align: 'right',
                layout: 'vertical',
                margin: 0,
                verticalAlign: 'top',
            },
            tooltip: {
                formatter: function () {
                    return 'Corr(<b>' + getPointCategoryName(this.point, 'x') +
                            '</b>, <b>'+getPointCategoryName(this.point, 'y') +
                            '</b>)<br>= <b>' + this.point.value + '</b>';
                }
            },
            series: [{
                data: getData(dict),
                dataLabels: {
                    enabled: true,
                    format: `{point.value:.4f}`
                }
            }]
        }}
    />);
}

export default Heatmap;
