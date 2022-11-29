export function dealOptions(options,xAxisData){
    let result = {
        seriesTitle:[],
        seriesType:[],
        seriesColor:[],
        seriesUnit:[],

        xAxisData:
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                data:[],
            }
        ,
        yAxisData:[],
        seriesData:[],
    };
    options.forEach((item,index)=>{
        result.seriesTitle.push(item.title)
        result.seriesType.push(item.type)
        result.seriesColor.push(item.color)
        result.seriesUnit.push(item.color)

        result.yAxisData.push({
            type: 'value',
            name: item.title,
            position: item.position,
            alignTicks: true,
            offset:item.offset?item.offset:0,
            axisLine: {
                show: true,
                lineStyle: {
                color: item.color
                }
            },
            axisLabel: {
                formatter: '{value}'+item.unit
            }
        })
        result.seriesData.push({
            name:item.title,
            type:item.type,
            data:item.data,
            yAxisIndex:index,
        })

    })
    result.xAxisData.data = xAxisData;



    return result;
}
