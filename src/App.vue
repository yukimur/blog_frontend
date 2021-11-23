<style scoped>
    .layout{
        border: 0px solid #d7dde4;
        /* background-color: #FFFFF0; */
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-footer-center{
        text-align: center;
    }
</style>
<template>
    <div class="layout">
        <Layout>
            <Nav></Nav>
            <router-view></router-view>
            <Footer class="layout-footer-center">yukimura &copy; <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2021031954号-1</a></Footer>
        </Layout>
    </div>
</template>
<script>
    // import axios from 'axios'
    // axios.defaults.withCredentials = true;
    // export const start = () => {
    //     return axios.request({
    //         method: "get",
    //         url: "http://82.156.121.144:5000/indexinfo/SH000300?start_date=2016-01-22"
    //     })
    // }

    import Nav from "./views/Nav"
    export default {
        components: {
            Nav,
        },
    }

</script>
