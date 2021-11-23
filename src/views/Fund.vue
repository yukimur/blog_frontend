<template>
    <Content :style="{background: '#FFFFF0', minHeight: '700px'}">
        <Row :style="{'margin':'110px auto 0','max-width':'1557px'}" :gutter="58">
            <i-col span="18">

            </i-col>
            <i-col span="6" :style="{'padding-left':'0px'}">

            </i-col>
        </Row>
    </Content>
</template>

<script>
    // import Search from "@/components/Search"
    // import ContentList from "@/components/ContentList"

    export default {
        name: "Fund",
        props: {
            msg: String
        },
        components: {
            // Search,
            // ContentList,
        },
        data () {
            return {

            }
        },
        methods:{
        },
        mounted() {
        }
    }
</script>