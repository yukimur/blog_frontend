<template>
  <Row>
    <div class="index_content" style="overflow: hidden;">
        <div v-swiper:mySwiper="swiperOption" class="swiper-container-left">
            <div class="swiper-wrapper">
                <div class="swiper-slide" style="background-image:url(./images/login-bg.png);background-size:100% 100%;"></div>
                <div class="swiper-slide" style="background-image:url(./images/logo.png);background-size:100% 100%;"></div>
                <div class="swiper-slide" style="background-image:url(./images/logo_b.png);background-size:100% 100%;"></div>
                <div class="swiper-slide" style="background-image:url(./images/logo_b.png);background-size:100% 100%;"></div>
            </div>
            
        <div class="swiper-pagination"></div>
            
        </div>
        <div class="swiper-container-right">
            <div class="swiper-wrapper">
                <div class="swiper-slide" style="background-image:url(./images/login-bg.png)"></div>
                <div class="swiper-slide" style="background-image:url(./images/logo.png)"></div>
                <div class="swiper-slide" style="background-image:url(./images/logo_b.png)"></div>
                <div class="swiper-slide" style="background-image:url(./images/logo_b.png)"></div>
            </div>
        </div>
    </div>
  </Row>
</template>

<style scoped> 
    .lbt{
        width:100%;
        height:400px;
    }
.index_content{
    border-width:10px;
    /* position:absolute; */
    /* top:163px; */
    /* width:881px; */
    height:368px;
    margin-top: 20px;
    /* display:flex; */
    /* opacity:0; */
}

.swiper-container-left {
    width: 722px;
    height: 368px;
    float: left;
    margin-right: 20px;
}  

.swiper-container-right {
    width: 150px;
    height: 368px;
    float: right;
    line-height:90px!important;
    opacity:0.5;
}  
.my-slide-thumb-active{
    opacity:1;
}
.swiper-container-left .swiper-wrapper .swiper-slide{
    width: 722;
    height: 368;
	background-repeat:no-repeat;
	/* background-size:100% 100%; */
	/* -moz-background-size:100% 100%; */
}
</style>
<script>
    // import { Swiper, SwiperSlide, } from 'vue-awesome-swiper'
    import { directive, } from 'vue-awesome-swiper'
    import 'swiper/src/swiper.scss'

    export default {
        name: "Lbt",
        data() {
            return {
                // banners: [ 'src/images/login-bg.png', 'images/logo.png', 'images/login-bg.png','images/logo.png' ],
                swiperOption: {
                    loop:true,
                    effect:"cube",
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
        },
        computed: {
            // swiper() {
            //     return this.$refs.mySwiper.$swiper
            // }
        },
        mounted() {
            console.log('Current Swiper instance object', this.mySwiper)
            // this.mySwiper.slideTo(3, 1000, false)
        }
    }

</script>