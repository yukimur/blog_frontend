<template>
    <div class="search">
        <Row class="search_row">
            <i-col span="2">
                <span class="search_span">关键词</span>
            </i-col>
            <i-col span="21">
                <Input v-model="keyword" placeholder="Enter something..." clearable style="width: 250px" />
            </i-col>
        </Row>
        <Row class="search_row">
            <i-col span="2">
                <span>日期</span>
            </i-col>
            <i-col span="21">
                <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 250px"></DatePicker>
            </i-col>
        </Row>
        <Row class="search_row">
            <i-col span="2">
                <span>标签</span>
            </i-col>
            <i-col span="6">
                <Select  filterable multiple style="width: 250px">
                    <Option v-for="item in tags" :value="item.value" :key="item.label">{{ item.value }}</Option>
                </Select>
            </i-col>
            <i-col span="3">
                <Button icon="ios-search" :style="{'margin':'0 20px'}" v-on:click="search()">搜索</Button>
            </i-col>
            <i-col span="2" v-show="$common.user.username">
                <Icon type="ios-create-outline" v-on:click="createPaper()" :style="{'line-height':0.75,cursor:'pointer'}" color=blue size=40></Icon>
            </i-col>
        </Row>
    </div>
</template>
<style scoped>
    .search{
        width:100%;
        background:#FFF8DC;
        display:block;
    }
    .search_row{
        margin:15px 0 15px;
    }
    .search_row span{
        font-family: cursive;
        font-size: 16px;
        margin:0 15px 0 25px;
        line-height:2;
    }
</style>
<script>
    import {create_blog,get_tags_base} from '../apis/api'
    
    export default {
        name: "Search",
        props: {
            msg: String
        },
        created:function (){
            get_tags_base({
                query:{
                    types: "博客",
                }
            }).then((res) => {
                var tags = new Array();
                for(const tag of res.data){
                    tags.push({"value":tag,"label":tag});
                }
                this.tags = tags;
            })
        },
        data(){
            // get_tags_base({
            //     query:{
            //         types: "博客",
            //     }
            // }).then((res) => {
            //     var tags = new Array();
            //     for(const tag of res.data){
            //         tags.push({"value":tag,"label":tag});
            //     }
            //     this.tags = tags;
            //     console.log(this.tags);
            // })
            return{
                tags: null,
                keyword: this.$route.query.keyword,
                user:this.$common.user,
            }
        },
        methods:{
            createPaper(){
                create_blog().then((res) => {
                    window.open("/blogdetail/"+res.data.id, "_blank"); 
                }).catch((res) => {
                    alert("create blog error");
                });
            },
            search(){
                
            }
        }
    }
</script>