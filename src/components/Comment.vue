<template>
    <div class="comment" :style="{width:'100%',margin:'60px auto'}">
        <List class="commentView" border :style="{'border-radius':'0px'}">
            <ListItem class="commentCount" :style="{margin:'40px auto 5px','border-bottom':'1px solid #cbc4c4','font-size':'23px','font-family':'cursive'}">0条评论</ListItem>
            <ListItem :style="{'font-size':'23px'}">抢个沙发~</ListItem>
            <ListItem>
                <span :style="{width:'130px'}">名字：</span>
                <Input v-model="name" size="large" placeholder="名字" :style="{width:'450px','margin-right':'70px'}" />
                <span :style="{width:'130px'}">邮箱：</span>
                <Input v-model="email" size="large" placeholder="邮箱" :style="{width:'450px','margin-right':'70px'}"/>
                <span :style="{width:'130px'}">联系方式：</span>
                <Input v-model="phone" size="large" placeholder="联系方式" :style="{width:'450px','margin-right':'70px'}"/>
            </ListItem>
            <ListItem>
                <span :style="{width:'130px'}">评论：</span>
            </ListItem>
            <ListItem>
                <Input v-model="content" type="textarea" :autosize="{minRows: 2,maxRows: 10}" placeholder="Enter something..." :style="{display:'block'}"/>
            </ListItem>
            <ListItem>
                <Button v-on:click="create_comment">发表</Button>
            </ListItem>
        </List>
        <List class="comments" border :style="{'border-radius':'0px'}">
            <ListItem v-for="item in comments" :key="item.id">{{ item.content }}</ListItem>
        </List>
    </div>
</template>
<style scoped>
    .comment{
        width:100%;
        background:#f2f2f2;
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
    import { get_comment_list,create_comment } from "../apis/api" 

    export default {
        name: "Comment",
        props: {
            msg: String
        },
        data(){
            return{
                name : '',
                email : '',
                phone : '',
                content : '',
                comments:[]
            }
        },
        created:function(){
            this.get_comment_list()
        },
        methods:{
            get_comment_list(){
                get_comment_list({
                    urlParams:{
                        "blog_id":this.$route.params.id
                    }
                }).then((res)=>{
                    this.comments = res.data;
                }).catch((res)=>{
                    // alert("get_comment",res);
                })
            },
            create_comment(){
                create_comment({
                    body:{
                        "name":this.name,
                        "email":this.email,
                        "phone":this.phone,
                        "content":this.content,
                        "blog_id":this.$route.params.id
                    }
                }).then((res)=>{
                    this.get_comment_list()
                }).catch((res)=>{
                    alert("create_comment",res);
                })
            }
        }
    }
</script>