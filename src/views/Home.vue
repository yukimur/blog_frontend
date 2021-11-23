<template>
    <Content :style="{background:'#FFFFF0'}">
    
        <Row :style="{'margin':'110px auto 0','max-width':'1557px'}" :gutter="58">
            <i-col span="18" :style="{}">
                <Row>
                    <Lbt></Lbt>
                </Row>
                <Row>
                    <HomeContentList></HomeContentList>
                </Row>
            </i-col>
            <i-col span="6" :style="{'padding-left':'0px'}">
                <Right></Right>
            </i-col>
        </Row>
    </Content>
</template>
<style scoped>
</style>
<script>
    import Lbt from "@/components/Lbt"
    import Right from "@/components/Right"
    import HomeContentList from "@/components/HomeContentList"
    export default {
        name: "Home",
        props: {
            msg: String
        },
        components: {
            Lbt,
            Right,
            HomeContentList,
        },
        data () {
            return {
            }
        },
        methods:{
        //   createChart(){
        //     start().then(resp => {
        //             var code = resp.data["code"];
        //             var name = resp.data["name"];
        //             var dates = resp.data["price"]["dates"];
        //             var netvalues = resp.data["price"]["netvalues"];
        //             console.log(dates);
        //             console.log(netvalues);
        //             var myChart = this.echarts.init(document.getElementById('main'));
        //             // 绘制图表
        //             myChart.setOption({
        //                 title: {
        //                     text: name+"("+code+")"+' 指数'
        //                 },
        //                 tooltip: {},
        //                 xAxis: {
        //                     data: dates
        //                 },
        //                 yAxis: {},
        //                 series: [{
        //                     name: name,
        //                     type: 'line',
        //                     data: netvalues
        //                 }]
        //             });
        //           }).catch(error => {
        //             console.log(error);
        //           });
        //   }
        },
        mounted() {
          // this.createChart();
        }
    }
</script>