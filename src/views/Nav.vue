<template>
    <Row :style="{position: 'fixed', width: '100%',padding: '0 40px',height:'78px',background:'#FFF8DC','z-index':3}">
        <Menu :style="{background: '#FFF8DC',width: '95%',height:'76px','margin':'0 auto'}" mode="horizontal" theme="light" active-name="1">
            <div class="layout-logo"><router-link to="/home">yukimura</router-link></div>
            <div class="layout-nav">
                <MenuItem :style="{'padding-top':'12px','font-size':'20px'}" name="home" to="/home"> 
                    <Icon type="md-home" :style="{'margin':'0 3px 0px -3px'}"/>Home
                </MenuItem> 
                <MenuItem :style="{'padding-top':'12px','font-size':'20px'}" name="blog" to="/blog">
                    <Icon type="ios-book" :style="{'margin':'0 3px 0 -3px'}"/>博客
                </MenuItem>
                <MenuItem :style="{'padding-top':'12px','font-size':'20px'}" name="essaye" to="/essaye">
                    <Icon type="ios-brush" :style="{'margin':'0 4px 0 -3px'}"/>随记
                </MenuItem>
                <MenuItem :style="{'padding-top':'12px','font-size':'20px'}" name="note" to="/note">
                    <Icon type="ios-book" :style="{'margin':'0 4px 0 -3px'}"/>笔记
                </MenuItem>
                <MenuItem :style="{'padding-top':'12px','font-size':'20px'}" name="fund" to="/fund">
                    <Icon type="ios-analytics" :style="{'margin':'0 4px 0 -3px'}"/>基金
                </MenuItem>
                <MenuItem :style="{'padding-top':'12px','font-size':'20px'}" name="data" to="/data">
                    <Icon type="ios-paper" :style="{'margin':'0 4px 0 -3px'}"/>数据
                </MenuItem>
                <div class="avatar">
                    <Dropdown>
                        <a v-on:click="showLogin=true" @mouseenter="showUserBox=true" href="javascript:void(0)">
                            <Avatar :style="{'background-color': '#87d068','margin':'auto 6px'}" icon="ios-person" size="small"/>
                            <span>{{ this.$common.user.username||"login" }}</span>
                        </a>
                        <DropdownMenu v-show="showUserBox&isLogin" slot="list">
                            <DropdownItem><span v-on:click="lagout">lagout</span></DropdownItem>
                        </DropdownMenu>
                        <Modal
                            title="Login"
                            v-model="showLogin"
                            class-name="vertical-center-modal"
                            ok-text="登录"
                            @on-ok="to_login"
                            @on-cancel="showLogin=false"
                            cancel-text="取消">
                            <List item-layout="vertical" :split="false">
                                <ListItem>
                                    <div :style="{padding:'0px 10px 0px 90px',display:'inline'}">用户名</div>
                                    <Input v-model="user.username" prefix="ios-contact" placeholder="请输入用户名" style="width: 240px" />
                                </ListItem>
                                <ListItem>
                                    <div :style="{padding:'0px 25px 0px 90px',display:'inline'}">密码</div>
                                    <Input v-model="user.password" type="password" password placeholder="请输入密码" style="width: 240px" />
                                </ListItem>
                            </List>
                        </Modal>
                    </Dropdown>
                </div>
            </div>
        </Menu>
    </Row>
</template>
<style scoped>
    .layout-logo{
        float: left;
        position: relative;
        font-family:fantasy;
        font-size:46px;
        margin-left:18px;
    }
    .layout-logo a{
        color:#39393d;
        vertical-align:sub;
    }
    .avatar{
        padding-top:12px;
        height: inherit;
        line-height: inherit;
        float: right;
    }
    .layout-nav{
        width: 740px;
        margin: 0 auto;
        margin-right:20px;
        font-family: cursive;
        font-weight: bold;
    }
    a{
        color:#39393d
    }
    .router-link-active{
        color:#2d8cf0
    }
    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        /* .ivu-modal{
            top: 0;
        } */
    }
</style>
<script>
    import { get_my_userinfo,login } from '../apis/api'

    export default {
        name: "Nav",
        components: {
            
        },
        data(){
            return {
                    isLogin:false,
                    showUserBox:false,
                    showLogin:false,
                    user:this.$common.user,

                }
        },
        props: {
            msg: String
        },
        created:function(){
            this.set_my_userinfo();

        },
        methods:{
            set_my_userinfo(token){
                if(token || window.localStorage.getItem("token")){
                    if(token!="undefined"&&token!=undefined){   
                        window.localStorage.setItem("token",token);
                    }
                    return get_my_userinfo().then((res) => {
                        this.$common.set_user(res.data);
                        this.isLogin = true;
                        return true;
                    }).catch((res) => {
                        this.$common.clear_user();
                        this.isLogin = false;
                        localStorage.token=null;
                        return false;
                    });
                }

            },
            to_login(){
                login({
                    body:{
                        username: this.user.username,
                        password:this.user.password
                    }
                }).then((res) => {
                    this.set_my_userinfo(res.data.token).catch((res) => {
                        alert("login fail: set_my_userinfo fail");
                    });
                }).catch((res) => {
                    alert("login fail: "+res.data);
                });
            },
            lagout(){
                this.$common.clear_user();
                this.isLogin = false;
                window.localStorage.setItem("token",null);
            }
        }
    }
</script>