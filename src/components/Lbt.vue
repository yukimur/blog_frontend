<template>
    <Row class="lbt">
        <i-col class="swiper-container-left" v-swiper:mySwiper="swiperOption" span="20" :style="{'min-height':'100%'}">
            <div class="swiper-wrapper">
                <div class="swiper-slide" :key="banner" v-for="banner in banners">
                    <a :href="'/blogdetail/'+banner.id">
                        <img :src="banner.title_page.url" :style="{'background-size':'880px 510px','background-repeat':'no-repeat','width': '880px','height':'510px'}">
                        <!-- <img :src="banner.image" :style="{'background-size':'880px 510px','background-repeat':'no-repeat','width': '880px','height':'510px'}"> -->
                    </a>
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </i-col>
        <i-col class="swiper-container-right" span="4" :style="{}">
            <div class="swiper-wrapper">
                <div class="swiper-slide" :key="banner" v-for="banner in banners" :style="{'margin-bottom':'10px','height': '120px'}">
                    <img :src="banner.title_page.url" :style="{'background-size':'160px 120px','background-repeat':'no-repeat','width': '160px','height':'120px'}">
                    <!-- <img :src="banner.image" :style="{'background-size':'160px 120px','background-repeat':'no-repeat','width': '160px','height':'120px'}"> -->
                </div>
            </div>
        </i-col>
    </Row>
</template>

<style scoped> 
    .lbt{
        max-height:100%;
        max-width:100%;
    }
    .swiper-container-left {
        float: left;
        overflow: hidden;
    }  
    .swiper-container-right{
        float:right;
        margin-left:0px;
        line-height:90px!important;
    }
    .slide-thumb-active{
        opacity:0.5;
    }
</style>
<script>
    // import { Swiper, SwiperSlide, } from 'vue-awesome-swiper'
    import { directive, } from 'vue-awesome-swiper'
    import 'swiper/src/swiper.scss'
    import {get_blog_list} from "../apis/api"

    export default {
        name: "Lbt",
        data() {
            return {
                banners: [ ],
                swiperOption: {
                    loop:true,
                    effect:"fade",
                    pagination: {
                        el: '.swiper-pagination'
                    },
                    thumbs:{
                        swiper:{
                            el:".swiper-container-right",
                            direction:"vertical",
                            slidesPerView:4,
                            soaceBetween:10,
                            watchSlidesVisibility:true
                        },
                        // slideThumbActiveClass:"slide-thumb-active"
                    }
                }
            }
        },
        mounted:function(){
            this.get_title_page_blog_list();
        },
        created:function(){

        },
        components: {
            // Swiper,
            // SwiperSlide,
        },
        directives: {
            swiper: directive
        },
        methods: {
            // onSwiper(swiper) {
            //     console.log(swiper);
            // },
            // onSlideChange() {
            //     console.log('slide change');
            // },
            get_title_page_blog_list() {
                var query = {
                    size:4,page:1,type:"博客",is_title_page:true
                };
                get_blog_list({
                    query:query
                }).then(function (response) {
                    return response.data
                }).then(data => {
                    var hits = data.hits;
                    var banners = [];
                    for (var i in hits) {
                        hits[i]._source["id"] = hits[i]["_id"];
                        banners.push(hits[i]._source);
                    }
                    this.banners = banners;
                })
            },
        },
        computed: {
            // swiper() {
            //     return this.$refs.mySwiper.$swiper
            // }
        }
    }

</script>