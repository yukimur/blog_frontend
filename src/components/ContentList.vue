<template>
    <div class="contentList">
        <div class="search">
            <Row class="search_row">
                <i-col span="2">
                    <span class="search_span">关键词</span>
                </i-col>
                <i-col span="21">
                    <Input v-model="keyword" placeholder="输入关键词" clearable style="width: 250px" />
                </i-col>
            </Row>
            <Row class="search_row">
                <i-col span="2">
                    <span>日期</span>
                </i-col>
                <i-col span="21">
                    <DatePicker type="daterange" placement="bottom-end" placeholder="选择时间" style="width: 250px"></DatePicker>
                </i-col>
            </Row>
            <Row class="search_row">
                <i-col span="2">
                    <span>标签</span>
                </i-col>
                <i-col span="6">
                    <Select  filterable multiple v-model="current_tag_list" style="width: 250px">
                        <Option v-for="item in tag_list" :value="item.value" :key="item.label">{{ item.value }}</Option>
                    </Select>
                </i-col>
                <i-col span="3">
                    <Button icon="ios-search" :style="{'margin':'0 20px'}" v-on:click="search()">搜索</Button>
                </i-col>
                <i-col span="2" >
                    <!-- v-show="$common.user.username" -->
                    <Icon type="ios-create-outline" v-on:click="createPaper()" :style="{'line-height':0.75,cursor:'pointer'}" color=blue size=40></Icon>
                </i-col>
            </Row>
        </div>
        <List item-layout="vertical">
            <ListItem :style="{margin:'0px 25px 5px'}" v-for="item in data" :key="item.id" loading>
                <ListItemMeta :avatar="item.avatar" :description="item.introduction?item.introduction:'无简介...'">
                    <template slot="title">
                        <a :href="'/blogdetail/'+item.id" v-text="item.title?item.title:'无标题'" target="_blank"></a>
                    </template>
                </ListItemMeta>
                <template slot="action">
                    <li>
                        <Icon type="ios-star-outline" /> 123
                    </li>
                    <li>
                        <Icon type="ios-thumbs-up-outline" /> 234
                    </li>
                    <li>
                        <Icon type="ios-chatbubbles-outline" /> 345
                    </li>
                </template>
                <template slot="extra">
                </template>
            </ListItem>
        </List>
        <Page :style="{margin:'40px 25px 30px'}" :total="total" :page-size="size" :current="currentPage" show-elevator show-total @on-change="on_change" />   
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
    .contentList{
        width:100%;
        background:#FFF8DC;
        display:block;  
    }
</style>
<script>
    import {get_blog_list,create_blog,get_tag_list_base} from '../apis/api'

    export default {
        name: "ContentList",
        props: {
            msg: String
        },
        data(){
            var result = {
                tag_list: null,
                current_tag_list: null,
                keyword: null,
                user:this.$common.user,
                total:0,
                size:10,
                currentPage:1,
                data:[]
            }
            return result
        },
        created:function (){
            // 初始请求
            this.keyword = this.$route.query.keyword;
            get_tag_list_base({
                query:{
                    type_list: "博客",
                }
            }).then((res) => {
                var tag_list = new Array();
                for(const item of res.data){
                    tag_list.push({"value":item.key,"label":item.key});
                }
                this.tag_list = tag_list;
            })
            var currenttag_list = this.$route.query.tag_list;
            if(currenttag_list!=undefined||currenttag_list!=null){
                this.currenttag_list = currenttag_list.split(",");
            }
            this.get_blog_list("博客",10,1,this.keyword,this.currenttag_list)
        },
        methods:{
            on_change(page){
                this.get_blog_list("博客",10,page,this.keyword,this.currenttag_list)
            },
            get_blog_list(type,size,page,keyword,tag_list) {
                if(tag_list!=undefined||tag_list!=null){
                    tag_list = tag_list.join(",")
                }
                var query = {
                    size:size,page:page,type:type
                };
                if (keyword!=undefined){
                    query["keyword"] = keyword
                }
                if (tag_list!=undefined){
                    query["tag_list"] = tag_list
                }
                get_blog_list({
                    query:query
                }).then(function (response) {
                    return response.data
                }).then(data => {
                    this.total = data["total"]["value"]
                    var hits = data.hits;
                    var datas = [];
                    for (var i in hits) {
                        hits[i]._source["id"] = hits[i]["_id"]
                        datas.push(hits[i]._source);
                    }
                    this.data = datas;
                    this.size = size;
                    this.currentPage = page;
                })
            },
            createPaper(){
                window.open("/blogdetail/0", "_blank"); 
            },
            search(){
                this.get_blog_list("博客",10,1,this.keyword,this.currenttag_list);
            }
        }
    }
</script>