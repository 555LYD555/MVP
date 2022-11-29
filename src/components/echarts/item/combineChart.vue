<template>
    <div class="itemcharts">
      <div ref="barChart" style="width: 100%; height: 100%"></div>
    </div>
</template>
<script>
import * as echarts from "echarts";
export default {
  name: 'combineChart',
  components: {},
  props:{
    result:{
        type:Object,
        default:()=>{
            return{
                seriesTitle:[],
                seriesType:[],
                seriesColor:[],
                seriesUnit:[],

                xAxisData:[
                    {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        data:[],
                    }
                ],
                yAxisData:[],
                seriesData:[],
            }
        }
    }
  },
  data() {
    return {
        // xData:["危化品", "非煤矿山", "金属冶炼", "工贸"],
        // yData:[12, 23, 12, 34],
        // colors: ['#5470C6', '#91CC75', '#EE6666'],
        options:{
            title:'Evaporation',
            type:'bar',
            color:'red',
            unit:'%',
            axisPositon:'left',
            axisOffset:0,
            data:[],        
        },
        // seriesTitle: ['Evaporation', 'Precipitation', 'Temperature'],
        // seriesType:['bar','line','line'],
        // seriesColor:['blue','yellow','red'],
        xData:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

    }
  },
  mounted() {
    debugger
    this.result
    let barChart = echarts.init(this.$refs.barChart);
    barChart.setOption(this.getBarChart(this.result));
  },
  methods: {
    getBarChart(result) {
      var option = {
        color: result.seriesColor,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            type: 'cross'
            }
        },
        grid: {
            right: '20%'
        },
        toolbox: {
            feature: {
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
            }
        },
        legend: {
            data: result.seriesTitle
        },
        xAxis: result.xAxisData,
        yAxis: result.yAxisData,
        // series: [
        //     {
        //     name: 'Evaporation',
        //     type: 'bar',
        //     data: [
        //         2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
        //     ]
        //     },
        //     {
        //     name: 'Precipitation',
        //     type: 'bar',
        //     yAxisIndex: 1,
        //     data: [
        //         2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
        //     ]
        //     },
        //     {
        //     name: 'Temperature',
        //     type: 'line',
        //     yAxisIndex: 2,
        //     data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        //     }
        // ]
        series:this.result.seriesData,
        };
      return option;
    },
  },
  computed: {
  },
  watch: {
    result(val,oldVal){
        debugger
        val
        oldVal
    }
  }
}
</script>
<style lang="scss" scoped>
.itemcharts {
  height: 100%;
  width:100%;
}
</style>