<template>
    <div class="right">
        <Row class="right-part">
            <Divider orientation="left"><span class="title">最新文章</span></Divider>
            <List border size="large" :style="{margin:'-15px 0px 8px',border:'0px'}">
                <ListItem v-for="item in latest_blogs.slice(0,4)" :key="item.id" loading>
                    <Icon type="ios-leaf" :style="{'margin':'0 4px 0 0'}"/>
                    <a :href="'/blogdetail/'+item.id" title="item.title" v-text="item.title?item.title:'无标题'" target="_blank"></a>
                </ListItem>
            </List>
        </Row>  
        <Row class="right-part">
        <Divider orientation="left"><span class="title">博文归档</span></Divider>
            <List border size="large" :style="{margin:'-15px 0px 8px',border:'0px'}">
                <ListItem v-for="item in group_by_date" :key="item.id" loading>
                    <Icon type="ios-calendar" :style="{'margin':'0 4px 0 0'}"/>
                    <a :href="'#'" v-text="item.year+'年'+item.month+'月归档'" target="_blank"></a>
                    </ListItem>
            </List>
        </Row>
        <Row class="right-part">
        <Divider orientation="left"><span class="title">博文分类</span></Divider>
            <List border size="large" :style="{margin:'-15px 0px 8px',border:'0px'}">
                <ListItem v-for="item in group_by_tag" :key="item.val" loading>
                    <Icon type="ios-navigate" :style="{'margin':'0 4px 0 0'}"/>
                    <a :href="'/blog?tags='+item.val">{{ item.val+'('+item.count+')' }}</a>
                </ListItem>
            </List>
        </Row>
        <Row class="right-part">
        <Divider orientation="left"><span class="title">标签云</span></Divider>
            <div id="tagcloud" style="width: 360px;height:260px;"></div>
        </Row>
        <Row class="right-part">
        <Divider orientation="left"><span class="title">网站统计</span></Divider>
            <List border size="large" :style="{margin:'-15px 0px 8px',border:'0px'}">
                <ListItem v-model="web_statis">请求次数：{{ web_statis.访问次数 }}</ListItem>
                <ListItem v-model="web_statis">博文数量：{{ web_statis.博文数量 }}</ListItem>
                <ListItem v-model="web_statis">博文总浏览量：{{ web_statis.博文总浏览量 }}</ListItem>
                <ListItem v-model="web_statis">博文总点赞量：{{ web_statis.博文总点赞量 }}</ListItem>
            </List>
        </Row>
    </div>
</template>

<style scoped> 
.right{
    height:1900px;
}
.right-part{
    height:340px;
    background: #FFF8DC;
    margin-bottom:30px;
}
.title{
    font-family:cursive;
    font-size:20px;
}
a{
    color: #17233d;
}
</style>
<script>
    import {get_latest_blog,get_group_by_date,get_group_by_tag,get_web_statis} from "../apis/api"

    export default {
        name: "Right",
        props: {
            msg: String
        },
        data(){
            return {
                latest_blogs:[],
                group_by_date:[],
                group_by_tag:[],
                tagcloud:[],
                web_statis:{}
            } 
        },
        created:function(){
            this.get_latest_blog();
            this.get_group_by_date();
            this.get_group_by_tag();
            this.get_web_statis();
        },
        methods:{
            get_latest_blog(){
                get_latest_blog({}).then((res) => {
                    this.latest_blogs = res.data.slice(0,5);
                })
            },
            get_group_by_date(){
                get_group_by_date({}).then((res) => {
                    this.group_by_date = res.data.slice(0,5);
                })
            },
            get_group_by_tag(){
                get_group_by_tag({}).then((res) => {
                    var result = res.data;
                    var group_by_tag=[];
                    var tagcloud=[];
                    for (var i in result) {
                        tagcloud.push(result[i]);
                        group_by_tag.push(result[i]);
                    }
                    this.group_by_tag = group_by_tag.slice(0,5);
                    this.tagcloud = tagcloud;
                    this.draw_tagcloud();
                })
            },
            get_web_statis(){
                get_web_statis({}).then((res) => {
                    this.web_statis = res.data;
                })
            },
            draw_tagcloud(){
                let tagcloudChart = this.echarts.init(document.getElementById("tagcloud"));
                var data = [];
                for(var index in this.tagcloud){
                    data.push({
                        "name":this.tagcloud[index]["val"],
                        "value":this.tagcloud[index]["count"]
                    })
                }
                let option = {
                    series:[
                        {
                            type: "wordCloud",
                            shape: 'circle',
                            left: 'center',
                            top: '0px',
                            sizeRange: [18, 30],
                            rotationRange: [-45, 45],
                            textStyle: {
                                fontFamily: 'sans-serif',
                                fontWeight: 'bold',
                                // Color can be a callback function or a color string
                                color: function () {
                                    // Random color
                                    return 'rgb(' + [
                                        Math.round(Math.random() * 160),
                                        Math.round(Math.random() * 160),
                                        Math.round(Math.random() * 160)
                                    ].join(',') + ')';
                                }
                            },
                            data:data
                        }
                    ]
                };
                tagcloudChart.setOption(option,true);
                tagcloudChart.on('click', function (params) {
                    window.location.href = `/blog?tags=${params.data.name}`;
                });
            }
        }
    }
</script>