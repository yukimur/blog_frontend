<template>
    <List item-layout="vertical" :style="{margin: '32px 0',width:'100%',background:'#FFF8DC'}" border size="large" split>
        <ListItem v-for="paper in papers" :key="paper.id" loading>
            <ListItemMeta :avatar="paper.avatar">
                <template slot="title">
                    <a :href="'/blogdetail/'+paper.id" v-text="paper.title?paper.title:'无标题'" target="_blank"></a>
                </template>
            </ListItemMeta>
            {{ paper.description?paper.introduction:'无简介...' }}
            <template slot="action">
                <li>
                    <Icon type="ios-star-outline" /> {{ paper.view_count }}
                </li>
                <li>
                    <Icon type="ios-thumbs-up-outline" /> {{ paper.admire_count }}
                </li>
                <li>
                    <Icon type="ios-chatbubbles-outline" /> 345
                </li>
            </template>
            <!-- <template slot="extra" v-if="paper.title_page"> -->
                <!-- <img :src="paper.title_page.image" style="width: 280px"> -->
            <!-- </template> -->
        </ListItem>
    </List>
</template>
<style scoped>

</style>
<script>
    import {get_blog_list} from "../apis/api"

    export default {
        name: "HomeContentList",
        props: {
            msg: String
        },
        data () {
            return {
                size:10,
                page:1,
                papers: []
            }
        },
        beforeMount:function(){
            this.get_blog_list(1);
        },
        mounted() {
            this.scroll()
        },
        methods: {
            get_blog_list(page) {
                var query = {
                    size:this.size,page:page,type:"博客",order_by:"-update_time"
                };
                get_blog_list({
                    query:query
                }).then(function (response) {
                    return response.data
                }).then(data => {
                    this.total = data.total.value
                    var hits = data.hits;
                    for (var i in hits) {
                        hits[i]._source["id"] = hits[i]["_id"];
                        this.papers.push(hits[i]._source);
                    }
                })
            },
            beforeMount() {
            },
            scroll() {
                let isLoading = false
                window.onscroll = () => {
                    // 距离底部200px时加载一次
                    let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= 10
                    if (bottomOfWindow && isLoading == false) {
                        isLoading = true
                        // setTimeout()
                        this.page = this.page + 1;
                        this.get_blog_list(this.page);
                        // axios.get(`https://randomuser.me/api/`).then(response => {
                        //     paper.push(response.data.results[0])
                        //     isLoading = false
                        // })
                    }
                }
            }
        }

    }
</script>