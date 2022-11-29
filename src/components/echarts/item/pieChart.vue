<template>
    <div class="itemcharts">
      <div
          ref="pieChart"
          style="width: 100%; height: 100%"
      ></div>
    </div>
</template>
<script>
import * as echarts from "echarts";
export default {
  name: 'pieChart',
  components: {},
  props:{
    chartData:{
      type:Array,
      default:()=>{
        return []
      }
    }
  },
  data() {
    return {
    //   chartData: [
    //       { name: "危险化学品", value: 500 },
    //       { name: "非煤矿山", value: 1000 },
    //       { name: "金属冶炼", value: 2000 },
    //       { name: "工贸", value: 3000 },
    //   ],
    }
  },
  mounted() {
    let pieChart = echarts.init(this.$refs.pieChart);
    pieChart.setOption(this.getIndicators(this.chartData));
    // window.onresize = function() {
    //     pieChart.resize();
    // };
  },
  methods: {
    getIndicators(datas) {
        let dataNum = datas.reduce((pre, cur) => pre + cur.value, 0);
        let option ={
          title: {
            textStyle: {
              color: "#666",
              fontSize: 28,
            },
            itemGap: 10,
            x: "25%",
            // x:"center",
            y: "center",
            text: dataNum,
          },
          tooltip: {},
          // legend: {
            // orient: "horizontal",
            // x: "center",
            // y: "bottom",
            // icon: "circle",
            // selectedMode:false,
          // },
          color:["#FACB58","#93BEFF","#283E81","#507AFC"],
          legend:{
            orient:'verticail',
            x:"80%",
            y:"center",
            align:'right',
            itemGap:15,
            itemHeight: 12,
            itemWidth:12,
            type:"scroll",
            
            // data:['危险化学品','非煤矿山','金属冶炼','工贸'],
            //formatter是series数据遍历时的回调，获得参数name
            formatter:(name)=>{
                let data = option.series[0].data;
                console.log(data);
                let total =0;
                let tarValue;
                for(let i=0;i<data.length;i++){
                  total+=data[i].value
                  if(data[i].name == name){
                    tarValue = data[i].value;
                  }
                }
                // let v = tarValue
                let p =Math.round((tarValue/total)*100)
                return ` ${name}:${p}%`
            }
          },
          series: [
            {
              type: "pie",
              radius:["40%", "70%"],
              center: ["30%", "50%"],
              avoidLabelOverlap: true,
              selectedOffset: 5,
              startAngle: 90,
              minAngle: 1,
              data: datas,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
                normal: {
                  label: {
                    show: false,
                    position: 'center',
                    // formatter: '{b}({c}):{d}%' ,
                    formatter: "{b}\n{c}",
                    color: "#000",
                  },
                  labelLine: {
                    show: true,
                    length: 10,
                  },
                  color: function (colors) {
                    var colorList = [
                      "#3AA1FF",
                      "#36CBCB",
                      "#4ECB73",
                      "#FBD437",
                      "#61A5FC",
                      "#F7B258",
                      "#9E9EFF",
                      "#91C717",
                      "#D19EFF",
                      "#F19EA8",
                    ];
                    return colorList[colors.dataIndex];
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