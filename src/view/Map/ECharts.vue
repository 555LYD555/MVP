<template>
    <div class="data-view">
        <splitpanes class="default-theme" horizontal style="height: 800px">
            <pane size="65">
                <Splitpanes>
                    <pane size="40">
                        <div id="main1"></div>
                    </pane>
                    <pane size="40">
                        <div id="main2"></div>
                    </pane>
                    <pane size="20">
                        <JsonPreview class="JsonEditor" :data="JsonData"></JsonPreview>
                    </pane>
                </Splitpanes>
            </pane>
            <pane size="35">

            </pane>
        </splitpanes>
    </div>
</template>
<script>
import { JsonPreview } from "../../components/codeEditor/index.js"
import { initChart } from "../../components/echarts/index.js"
// 插件vue-splitter，详见git地址：https://github.com/antoniandre/splitpanes
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

export default {
    components: { JsonPreview, Splitpanes, Pane },
    data() {
        return {
            JsonData: {
                name: 'ddd',
                age: '22',
                children: [
                    { name: 'zzz', age: '11' },
                    { name: 'zzz', age: '11' },
                ]
            }
        }
    },

    mounted() {
        // 基于准备好的dom，初始化echarts实例
        // let myChart = this.$echarts.init(document.getElementById("main1"))
        let myChart = initChart("main1")
        // 指定图表的配置项和数据
        myChart.setOption({
            // 全图默认背景
            backgroundColor: '#90ACC9',
            // 默认色板
            color: ['#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
                '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
                '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
                '#6699FF', '#ff6666', '#3cb371', '#b8860b', '#30e0e0'],

            title: {
                text: '基础柱形图',
                x: 'center',
                y: 'top',
                // backgroundColor: 'red',
                // borderColor: '#ccc',
                // borderWidth: 1,
                // padding: 5,
                // 主副标题间隔
                itemGap: 10,
                subtext: '副标题',
                // textStyle: {
                //     fontSize: 18,
                //     fontWeight: 'bolder',
                //     color: 'gray'                             // 主标题具体样式配置
                // },
                // subtextStyle: {
                //     // fontSize: 14,
                //     // fontWeight: 'bolder',
                //     color: 'black'                            // 副标题具体样式配置
                // }
            },
            // 图例配置
            legend: {
                //-----模块整体样式------
                x: 'right',
                y: 'top',
                // backgroundColor: 'gray',
                // borderColor: '#ccc',
                // borderWidth: 0,
                // padding: 5,
                itemGap: 10,
                //-----图例详细配置------
                orient: 'horizontal',  //布局方式，默认为水平，可选'horizontal' ¦ 'vertical'
                itemWidth: 20,             // 图例图形宽度
                itemHeight: 14,            // 图例图形高度
                // textStyle: {
                //     color: 'red'                              // 图例文字颜色
                // }


            },
            //提示框配置
            tooltip: {
                // ------模块基础配置-----
                backgroundColor: 'rgba(0,0,0,0.7)',  // 提示背景颜色，默认为透明度为0.7的黑色
                borderColor: '#333',            // 提示边框颜色
                borderRadius: 4,                // 提示边框圆角，单位px，默认为4
                borderWidth: 0,                // 提示边框线宽，单位px，默认为0（无边框）
                padding: 5,
                textStyle: {
                    color: 'red'
                },

                // ------提示动画效果配置-----
                trigger: 'item',           // 触发类型，默认数据触发，见下图，可选为：'item' ¦ 'axis'
                showDelay: 20,             // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                hideDelay: 100,            // 隐藏延迟，单位ms
                transitionDuration: 0.4,         // 动画变换时间，单位s

                // axisPointer: {                 // 坐标轴指示器，坐标轴触发有效
                //     type: 'line',         // 默认为直线，可选为：'line' | 'shadow'
                //     lineStyle: {          // 直线指示器样式设置
                //         color: '#48b',
                //         width: 2,
                //         type: 'solid'
                //     },
                //     shadowStyle: {              // 阴影指示器样式设置
                //         width: 'auto',         // 阴影大小
                //         color: 'rgba(150,150,150,0.3)'  // 阴影颜色
                //     }
                // },
            },
            // 区域缩放控制器配置
            dataZoom: {
                orient: 'horizontal',         // 布局方式，默认为水平布局，可选为：
                // 'horizontal' ¦ 'vertical'
                // x: {number},              // 水平安放位置，默认为根据grid参数适配，可选为：
                // {number}（x坐标，单位px）
                // y: {number},              // 垂直安放位置，默认为根据grid参数适配，可选为：
                // {number}（y坐标，单位px）
                // width: {number},           // 指定宽度，横向布局时默认为根据grid参数适配
                // height: {number},          // 指定高度，纵向布局时默认为根据grid参数适配
                backgroundColor: 'rgba(0,0,0,0)',    // 背景颜色
                dataBackgroundColor: '#eee',       // 数据背景颜色
                fillerColor: 'rgba(144,197,237,0.2)', // 填充颜色
                handleColor: 'rgba(70,130,180,0.8)'       // 手柄颜色
            },
            // 网格配置
            // grid: {
            //     x: 80,
            //     y: 60,
            //     x2: 80,
            //     y2: 60,
            //     // width: {totalWidth} - x - x2,
            //     // height: {totalHeight} - y - y2,
            //     backgroundColor: 'rgba(0,0,0,0)',
            //     borderWidth: 1,
            //     borderColor: '#ccc'
            // },
            // x轴配置定义
            xAxis: {
                type: 'category',
                name: '月份',
                // axisLine: { show: true },//轴刻度
                // axisTick: { show: true },//轴刻度
                // axisLabel: {   //轴类目文字样式
                //     fontSize: 12,
                //     color: blue
                // },
                data: ['一', '二', '三', '四', '五', '十一']
            },
            // y轴配置定义
            yAxis: [{
                type: "value",
                name: "数量/个",
                axisLine: { show: true },
                axisTick: { show: true },
                splitArea: { show: false },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.15)',
                        // type: 'dashed', // dotted 虚线
                    },
                },
                axisLabel: {
                    fontSize: 12,
                    color: '#6A93B9',
                    fontFamily: 'Bebas',
                },
            }, {
                type: "value",
                name: "成功率",
                position: 'right',  //多轴（多于两个轴）通过position和offset属性设置轴的左右和偏移量
                offset: 10,//偏移
                axisLine: { show: true },
                axisTick: { show: true },
                splitArea: { show: false },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.15)',
                        // type: 'dashed', // dotted 虚线
                    },
                },
                axisLabel: {
                    fontSize: 12,
                    color: '#6A93B9',
                    fontFamily: 'Bebas',
                },
            }, {
                type: "value",
                name: "成功率",
                position: 'right',
                offset: 30,//偏移
                axisLine: { show: true },
                axisTick: { show: true },
                splitArea: { show: false },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.15)',
                        // type: 'dashed', // dotted 虚线
                    },
                },
                axisLabel: {
                    fontSize: 12,
                    color: '#6A93B9',
                    fontFamily: 'Bebas',
                },
            }],
            series: [{
                name: '人数',
                type: 'bar',
                yAxisIndex: 0,  //定义值轴的位置，0左1右
                data: [45, 46, 56, 34, 47, 5]
            }, {
                name: '成功率',
                type: 'line',
                smooth: true,
                yAxisIndex: 1,
                data: [45, 46, 96, 34, 47, 5]
            }, {
                name: '失败率',
                type: 'line',
                smooth: false,
                yAxisIndex: 1,
                data: [15, 146, 196, 134, 147, 15]
            }]
        })

        let myChart2 = initChart("main2")
        let option2 = {
            title: {
                text: '基础折线图',
            },
            xAxis: {
                data: ['A', 'B', 'C', 'D', 'test']
            },
            yAxis: {},
            series: [
                {
                    data: [10, 22, 28, 5, 0],
                    type: 'line',
                    smooth: true
                }
            ]
        };
        myChart2.setOption(option2)

    },
    methods: {
        draw(legend, xAxis, series) {
            let myChart2 = this.$echarts.init(document.getElementById("main2"))
            let option = {
                title: {
                    text: '会话量',
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: legend
                },
                xAxis: {
                    type: 'category',
                    data: xAxis
                },
                yAxis: {
                    type: 'value'
                },
                series: series
            }
            myChart2.setOption(option)
        }
    }
}
</script>
<style lang="scss" scoped>
.data-view {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .default-theme {
        width: 100%;

        #main1,
        #main2 {
            height: 500px;
            width: 100%;
        }
    }
}

.JsonEditor {
    height: 200px;
    width: 200px;
}
</style>
