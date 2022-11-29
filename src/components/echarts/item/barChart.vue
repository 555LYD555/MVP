<template>
    <div class="itemcharts">
      <div ref="barChart" style="width: 100%; height: 100%"></div>
    </div>
</template>
<script>
import * as echarts from "echarts";
export default {
  name: '',
  components: {},
  props:{
    xData:{
        type:Array,
        default:()=>{
            return []
        }
    },
    yData:{
        type:Array,
        default:()=>{
            return []
        }
    },
  },
  data() {
    return {
        // xData:["危化品", "非煤矿山", "金属冶炼", "工贸"],
        // yData:[12, 23, 12, 34],
    }
  },
  mounted() {
    let barChart = echarts.init(this.$refs.barChart);
    barChart.setOption(this.getBarChart(this.xData,this.yData));
  },
  methods: {
    getBarChart(xData, yData) {
      var option = {
        title: {},
        tooltip: {},
        grid: {
          x: 30,
          y: 35,
          x2: 20,
          y2: 30,
          borderWidth: 1,
        },
        xAxis: {
          axisTick: {
            show: false,
          },
          data: xData,
          axisLabel: {
            show: true,
            interval: 0, //使x轴上的文字显示完全,
            textStyle: {
              show: true,
              color: "#bbb",
              fontSize: 12,
            },
            formatter: function (params) {
              var newParamsName = "";
              var paramsNameNumber = params.length;
              var provideNumber = 5;
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
              if (paramsNameNumber > provideNumber) {
                for (var p = 0; p < rowNumber; p++) {
                  var tempStr = "";
                  var start = p * provideNumber;
                  var end = start + provideNumber;
                  if (p == rowNumber - 1) {
                    tempStr = params.substring(start, paramsNameNumber);
                  } else {
                    tempStr = params.substring(start, end) + "\n";
                  }
                  newParamsName += tempStr;
                }
              } else {
                newParamsName = params;
              }
              return newParamsName;
            },
          },
          axisLine: {
            show: true,
            lineStyle:{
              color:'#bbb',
            }
          },
        },
        yAxis: {
          axisTick: {
            show: false,
          },
         axisLine: {
            show: true,
            lineStyle:{
              color:'#bbb',
            }
          },
          axisLabel: {
            textStyle: {
              show: true,
              color: "#bbb",
              fontSize: "12",
            },
          },
          splitLine :{
            lineStyle:{
                type:'dashed'//虚线
            },
            show: true //是否显示
          }
        },
        series: [
          {
            type: "bar",
            data: yData,
            barWidth: 35, //柱图宽度
            itemStyle: {
              //上方显示数值
              normal: {
                borderRadius:[5,5,0,0],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2867FA' },
                  // { offset: 0.5, color: '#188df0' },
                  { offset: 1, color: '#4AA1FC' }
                ]),
                label: {
                  show: true,
                  position: 'top',
                  textStyle:{
                    color:'#4AA1FC',
                    fontSize:14,
                    fontWeight:600,
                  }
                },
              },
            },
          },
        ],
      };
      return option;
    },
  },
  computed: {
  },
  watch: {
  }
}
</script>
<style lang="scss" scoped>
.itemcharts {
  height: 100%;
  width:100%;
}
</style>