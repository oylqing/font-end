<template>
    <div id="display">
        <Header></Header>
        <div id="pic_container">
           
        <div id="pic4" class="right">
        </div>
        <div id="pic1" class="left">
        </div>
        <div id="pic2" class="left"> 
        </div>
        <div id="pic3" class="left"> 
        </div>
        <el-tag v-text="RTT"></el-tag>
        </div>
            
    </div>
</template>

<script>
import Header from '@/components/header'
//import TableData from '@/assets/test.json'
export default {
    data(){
        return {
            time:"",
            xAxis: [],
            RTT: []
        }
    },
    components:{
        'Header': Header
        },
    mounted(){
    //setInterval(this.drawLine({el:"pic1", option:{title:"实时RTT",subtext:"数据来自华为vlab"}}), 1000);
    setInterval(this.drawLine(), 1000);
    //this.drawLine({el:"pic2", option:{title:"实时带宽",subtext:"数据来自华为vlab"}});
    //this.drawLine({el:"pic3", option:{title:"实时丢包率",subtext:"数据来自华为vlab"}});
    this.drawGauge({el:"pic4", option:{title:"评估",subtext:"数据来自华为vlab"}});
    //this.getTableData();
    //setInterval(this.getTableData, 1000);
  },
  methods: {
      getTableData(){
          this.$axios.get('http://localhost:8080/static/test.json').then((res) => {
              console.log('数据加载成功');
              //var TableData = JSON.parse(res);
              //console.log(res);
              this.time = res.data.time;
          })
      },
      getLineData(){
          this.$axios.get('http://localhost:8080/static/line.json').then((res) => {
          console.log('数据加载成功');
          var now = new Date();
          var time = now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
          if(this.xAxis.length < 20){
              this.xAxis.push(time);
              this.RTT.push(res.data.RTT);
          }else{
              this.xAxis.shift();
              this.RTT.shift();

              this.xAxis.push(time);
              this.RTT.push(res.data.RTT);
          }
          })
      },
    drawLine(data){
        this.getLineData();
        //var opt = data.option;
        var title = '实时RTT';//opt.title;
        var subtext = '数据来自华为vlab';//opt.subtext;
        let myChart = this.$echarts.init(document.getElementById("pic1"));
        var option = {
            title: {
                text: title,
                subtext: subtext
                },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                animation: false
            }
        },
        xAxis: {
            type: 'time',
            splitLine: {
                show: false
            },
            data: this.xAxis,
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            }
        },
        series: [{
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: this.RTT,
        }]
    };
    /*setInterval(function () {
        for (var i = 0; i < 5; i++) {
            data.shift();
            data.push(this.getLineData());
        }
    myChart.setOption({
        series: [{
            data: data
        }]
    });
    }, 1000);*/
    
    myChart.setOption(option);   
    },

    drawGauge(data){
        var opt = data.option;
        var title = opt.title;
        var subtext = opt.subtext;
        let myChart = this.$echarts.init(document.getElementById(data.el));
        var option = {
            title: {
                text: title,
                subtext: subtext
                },
            tooltip : {
            formatter: "{a} <br/>{b} : {c}%"
            },
            toolbox: {
                show: false, 
                feature: {
                    restore: {},
                    saveAsImage: {}
                    }
                },
                series: [{
                    name: '业务指标',
                    type: 'gauge',
                    min: 0,
                    max: this.Config.Gaugemax,
                    axisLine: {            // 坐标轴线
                       lineStyle: {       // 属性lineStyle控制线条样式
                       color: [[this.Config.Level1/this.Config.Gaugemax, '#CD5C5C'],[this.Config.Level2/this.Config.Gaugemax, '#FFA500'],[1, '#3CB371']], 
                       width: 30
                       }
                    },
                    
                    detail: {formatter:'{value}'},
                    data: [{value: 50, name: '评分'}]
                }] 
            };
        
        setInterval(function () {
            option.series[0].data[0].value = (4.3 + Math.random() * 0.5).toFixed(2) - 0;
            myChart.setOption(option, true);
            },1000);
        myChart.setOption(option);
    }
  }
}
</script>

<style lang="less">

#pic_container{
    position: relative;
}
.left{
    height: 240px;
    width: 45%;
    margin-top: 20px;
    margin-left: 20px;
    float: left;
    
}
.right{
    height: 700px;
    width: 45%;
    margin-top: 50px;
    float: right;
}
    

</style>



