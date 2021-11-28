<template>
    <Content :style="{background:'#FFFFF0'}">
        <Row :style="{'margin':'110px auto 0','max-width':'1557px'}" :gutter="58">
            <i-col span="18" :style="{'padding-right':'0px'}">
                <Spin size="large" fix v-if="spinShow" style="z-index:2">加载中...</Spin>
                <Row :style="{'min-height':'700px',background:'#FFF8DC',padding:'25px 15px 10px','font-family':'cursive'}">
                    <List v-if="edit==false" class="view" :style="{'border-radius':'0px',width:'100%'}">
                        <ListItem class="title" :style="{width:'100%',display:'block','text-align':'center','padding':'5px 0'}">
                            <span :style="{'font-size':'28px'}">{{ blog.title||"尚未编辑" }}</span>
                            <Icon type="md-create" v-show="$common.user.username" v-on:click="changeViewOrEdit(true)" size=28 :style="{float:'right','line-height':'inherit',cursor:'pointer'}"/>
                        </ListItem>
                        <ListItem :split=false class="overview" :style="{width:'100%',display:'block','text-align':'center'}">
                            <span>{{ blog.author.username }}</span><span :style="{'font-size':'1px',margin:'auto 10px'}">●</span><span>创建时间：{{ blog.create_time }}</span>
                            <span :style="{'font-size':'1px',margin:'auto 10px'}">●</span><span>更新时间：{{ blog.update_time }}</span>
                        </ListItem>
                        <ListItem :split=false class="overview" :style="{width:'100%',display:'block','text-align':'center'}">
                            {{ blog.tag_list }} {{ blog.admire_count }} 评论 {{ blog.view_count }} 阅读
                        </ListItem>
                        <ListItem class="introduction" :style="{width:'100%','padding':'25px'}">简介：{{ blog.introduction }}</ListItem>
                        <mavonEditor class="mavonEditor" ref=md :style="{'min-height':'800px',width:'100%','z-index':zIndex}" :boxShadow=false :previewBackground="'#FFF8DC'" :toolbarsFlag="toolbarsFlag" :subfield="subfield" :defaultOpen="defaultOpen" fontSize=19px codeStyle='tomorrow'
                        v-model="blog.content"></mavonEditor>
                    </List>
                    <List v-else class="edit" :style="{'border-radius':'0px',width:'100%'}">
                        <ListItem class="title-edit" :style="{width:'100%',display:'block','text-align':'left','padding':'5px 0'}">
                            <span :style="{'font-size':'25px'}">标题：</span>
                            <Input v-model="blog.title" size="large" clearable style="width: 500px" />
                            <Icon type="md-checkmark-circle" v-on:click="save_blog" size=28 :style="{float:'right','line-height':'inherit',cursor:'pointer'}"/>
                            <Icon type="md-close-circle" v-on:click="edit=~edit" size=28 :style="{float:'right','line-height':'inherit',cursor:'pointer'}"/>
                        </ListItem>
                        <ListItem class="type_list-edit" :style="{width:'100%',display:'block','text-align':'left','padding':'5px 0'}">
                            <span :style="{'font-size':'25px'}">类型：</span>
                            <Select v-model="blog.type_list" multiple filterable allow-create @on-create="createType" style="width:260px">
                                <Option v-for="item in type_list" :value="item.value" :key="item.label">{{ item.value }}</Option>
                            </Select>
                        </ListItem>
                        <ListItem class="tag_list-edit" :style="{width:'100%',display:'block','text-align':'left','padding':'5px 0'}">
                            <span :style="{'font-size':'25px'}">标签：</span>
                            <Select v-model="blog.tag_list" multiple filterable allow-create @on-create="createTag" style="width:260px">
                                <Option v-for="item in tag_list" :value="item.value" :key="item.label">{{ item.value }}</Option>
                            </Select>
                        </ListItem>
                        <ListItem class="tag_list-edit" :style="{width:'100%',display:'block','text-align':'left','padding':'5px 0'}">
                            <span :style="{'font-size':'25px'}">上传封面：</span>
                            <Upload action="http://119.91.151.31:8005/blog/image/" style="display:inline-block" on-success="upload_title_page" show-upload-list=true>
                                <Button icon="ios-cloud-upload-outline">upload</Button>
                            </Upload>
                        </ListItem>
                        <ListItem class="introduction-edit" :style="{width:'100%'}">
                            <span :style="{'font-size':'25px'}">简介：</span>
                            <Input v-model="blog.introduction" type="textarea" :rows="4" size="large" clearable style="width: 900px" />
                        </ListItem>
                        <ListItem><span :style="{'font-size':'25px'}">正文：</span></ListItem>   
                            <mavonEditor class="mavonEditor" ref=md :style="{'min-height':'800px',width:'100%','z-index':zIndex}" :toolbarsFlag="toolbarsFlag" :subfield="subfield" :defaultOpen="defaultOpen" fontSize=19px toolbarsBackground='#754F44' codeStyle='tomorrow'
                            v-model="blog.content" @save="save" @fullScreen='fullScreen' @imgAdd="imgAdd"></mavonEditor>
                    </List>
                </Row>
                <Row>
                    <Comment></Comment>
                </Row>
            </i-col>
            <i-col span="6">
                <Right></Right>
            </i-col>
        </Row>
    </Content>
</template>
<style scope>
    .rich img{ display:block; max-width: 100%}
</style>
<script>

    import { mavonEditor } from "mavon-editor";
    import "mavon-editor/dist/css/index.css";
    import Right from "@/components/Right"
    import Comment from "@/components/Comment"
    import dayjs from 'dayjs';
    import VueKatex from 'vue-katex';
    import {patch_blog,create_blog,get_blog_detail,get_tag_list_base,get_type_list_base,upload_image} from "../apis/api"

    
    export default {
        name: "BlogDetail",
        props: {
            msg: String,
        },
        components: {
            mavonEditor,
            Right,
            Comment
        },
        data () {
            this.$common.user   // ???
            var edit = false;
            if (this.$route.params.id== 0){
                edit = true
            }
            var result = {
                edit:edit,
                blog:{
                    title:"",
                    introduction:"",
                    content:"",
                    type_list:[],
                    tag_list:[],
                    author:"",
                    create_time:null,
                    update_time:null
                },
                zIndex:0,
                toolbarsFlag:false,
                subfield:false,
                defaultOpen:"preview",

                type_list:null,
                tag_list:null,

                spinShow:false
            }
            if (this.$route.params.id!=0){
                result["spinShow"] = true
                get_blog_detail({
                    urlParams:{
                        "id":this.$route.params.id
                    }
                }).then((res) => {
                    result["blog"]["title"] = res.data["title"]
                    result["blog"]["introduction"] = res.data["introduction"]
                    result["blog"]["content"] = res.data["content"]
                    result["blog"]["type_list"] = res.data["type_list"]
                    result["blog"]["tag_list"] = res.data["tag_list"]
                    result["blog"]["author"] = 1
                    result["blog"]["view_count"] = res.data["view_count"]
                    result["blog"]["admire_count"] = res.data["admire_count"]
                    result["blog"]["create_time"] = dayjs(res.data["create_time"]).format("YYYY-MM-DD")
                    result["blog"]["update_time"] = dayjs(res.data["update_time"]).format("YYYY-MM-DD")
                    this.spinShow = false;
                })
            }else{
                result["spinShow"] = false;
            }
            return result;
        },
        created:function(){
            get_tag_list_base({
                query:{
                    type_list: "博客",
                }
            }).then((res) => {
                var tag_list = new Array();
                for(var index in res.data){
                    tag_list.push({"value":res.data[index].key,"label":res.data[index].key});
                }
                this.tag_list = tag_list;
            }),
            get_type_list_base().then((res) => {
                var type_list = new Array();
                for(var type of res.data){
                    type_list.push({"value":type.key,"label":type.key});
                }
                this.type_list = type_list;
            })
        },
        methods:{
            upload_title_page(response){
                console.log(response.data);
            },
            changeViewOrEdit(edit){
                if(edit==true){
                    this.toolbarsFlag = true;
                    this.subfield = true;
                    this.defaultOpen = "edit";
                }else{
                    this.toolbarsFlag = false;
                    this.subfield = false;
                    this.defaultOpen = "preview";
                }
                this.edit = edit;
            },
            save(value, render) {
                this.blog.content = value;
            },
            fullScreen(status) {
                if(status==true){
                    this.zIndex = 1500;
                }else{
                    this.zIndex = 0;
                }
            },
            save_blog(){
                if (this.$route.params.id==0){
                    this.create_blog();
                }else{
                    this.patch_blog();
                }
            },
            create_blog(){
                create_blog({
                    body:{
                        title: this.blog.title,
                        introduction: this.blog.introduction,
                        content: this.blog.content,
                        type_list: this.blog.type_list,
                        tag_list: this.blog.tag_list,
                    }
                }).then((res)=>{
                    var id = res.data["id"];
                    window.location.href = "/blogdetail/"+id;
                }).catch((res)=>{
                    alert(res);
                })
            },
            patch_blog(){
                patch_blog({
                    body:{
                        title: this.blog.title,
                        introduction: this.blog.introduction,
                        content: this.blog.content,
                        type_list: this.blog.type_list,
                        tag_list: this.blog.tag_list,
                    },
                    urlParams:{
                        id:this.$route.params.id
                    }
                }).then((res)=>{
                    this.changeViewOrEdit(false);
                }).catch((res)=>{
                    alert(res);
                })
            },
            createTag(val){
                this.tag_list.push({
                    value: val,
                    label: val
                });
            },
            createType(val){
                this.type_list.push({
                    value: val,
                    label: val
                });
            },
            imgAdd(pos, $file){
                // 第一步.将图片上传到服务器.
                var formdata = new FormData();
                formdata.append('image', $file);
                formdata.append('is_public', true);
                upload_image({
                    body:formdata,
                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then((res)=>{
                    alert(res.data.url);
                    this.$refs.md.$img2Url(pos, res.data.url);
                })
            },
        },
        mounted() {
        }
    }
</script>