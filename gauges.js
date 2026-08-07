class Gauge{

    constructor(id,title,color,max){

        this.chart=echarts.init(document.getElementById(id));

        this.option={

            animationDuration:500,

            animationDurationUpdate:300,

            animationEasingUpdate:"cubicOut",

            series:[{

                type:"gauge",

                min:0,

                max:max,

                progress:{
                    show:true,
                    roundCap:true,
                    width:18
                },

                pointer:{
                    length:"70%"
                },

                axisLine:{
                    lineStyle:{
                        width:18
                    }
                },

                axisTick:{
                    show:false
                },

                splitLine:{
                    show:false
                },

                axisLabel:{
                    color:"#aaa"
                },

                title:{
                    color:"#fff",
                    fontSize:18
                },

                detail:{
                    valueAnimation:true,
                    formatter:"{value}",
                    color:"#00E5FF",
                    fontSize:28
                },

                itemStyle:{
                    color:color
                },

                data:[{
                    value:0,
                    name:title
                }]
            }]
        };

        this.chart.setOption(this.option);

    }

    update(value){

        this.option.series[0].data[0].value=value;

        this.chart.setOption(this.option);

    }

}
