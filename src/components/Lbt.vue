<template>
    <Row class="lbt">
        <i-col class="swiper-container-left" v-swiper:mySwiper="swiperOption" span="20" :style="{'min-height':'100%'}">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="banner in banners" :key="banner.id">
                    <a :href="`/blogdetail/${banner.id}`">
                        <img :src="`http://yukimura.club${banner.url}`" :style="{'background-size':'880px 510px','background-repeat':'no-repeat','width': '880px','height':'510px'}">
                    </a>
                </div>
            </div>
            <!-- <div class="swiper-pagination" slot="pagination"></div> -->
        </i-col>
        <i-col class="swiper-container-right" span="4" :style="{}">
            <div class="swiper-wrapper">
                <div class="swiper-slide swiper-slide1" :key="banner.id" v-for="banner in banners" :style="{'margin-bottom':'10px','height': '120px'}">
                    <img :src="`http://yukimura.club${banner.url}`" :style="{'border-style': 'outset','background-size':'160px 120px','background-repeat':'no-repeat','width': '160px','height':'120px'}">
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
    .swiper-slide1 {
        opacity:0.7;
    }
    .swiper-container-left {
        float: left;
        overflow: hidden;
    }  
    .swiper-container-right{
        float:right;
        text-align:center;
        margin-left:0px;
        line-height:90px!important;
    }
    .slide-thumb-active{
        opacity:1;
    }
    .slide-thumb{
        cursor:pointer;
        /* border: 1px solid #000000; */
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
                    // loop:true,
                    observer: true,
                    observeParents: true,
                    autoplay: {
                        disableOnInteraction: false,
                        delay:2500
                    },
                    // effect:"cube",
                    grabCursor: true,
                    thumbs:{
                        swiper:{
                            el:".swiper-container-right",
                            direction:"vertical",
                            observer: true,
                            observeParents: true,
                            slidesPerView:4,
                            // spaceBetween:10,
                            watchSlidesVisibility: true,
                        },
                        thumbsContainerClass:"slide-thumb",
                        slideThumbActiveClass: "slide-thumb-active"
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
                        banners.push({
                            'id': hits[i]._id,
                            'url': hits[i]._source.title_page.url
                        });
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