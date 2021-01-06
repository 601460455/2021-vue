<template>
    <div>
        <!-- 显示图片 -->
        <div class="headBox">
            <img v-lazy='filmInfo.poster'  class="headImg">
        </div>
        <!-- 电影介绍 -->
        <div>
            <div> {{filmInfo.name}} </div>
            <div> {{filmInfo.category}} </div>
            <div> {{filmInfo.premiereAt | parsePermiereAt}} </div>
            <div> {{filmInfo.nation}} | {{ filmInfo.runtime}} </div>
            <div> {{filmInfo.synopsis}} </div>
        </div>
        <!-- 显示演员信息 -->
        <div>
            <Actors :key="filmInfo.actors.length">
                <div slot="mation" class="swiper-slide" v-for="(item, index) in filmInfo.actors" :key="index">
                    <img :src="item.avatarAddress" width="85" alt="">
                </div>
            </Actors>
        </div>
        <!-- 剧照 -->
        <div>
            <Actors :key="filmInfo.photos.length">
                <div slot="photo" class="swiper-slide" v-for="(item, index) in filmInfo.photos" :key="index" >
                    <img :src="item" width="150" alt="">
                </div>
            </Actors>
        </div>
    </div>
</template>

<script>
import Actors from '@/views/Films/Actors'
import uri from '@/config/uri'
import Vue from "vue";
import { Toast } from 'vant'
Vue.use(Toast)

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    loading:'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4105776946,2723577313&fm=26&gp=0.jpg'
})
import moment from 'moment'
export default {
    data(){
        return {
            filmInfo:{ actors:[],photos:[] }
        }
    },
    components:{
        Actors
    },
    filters:{
        parsePermiereAt(timestamp){
            return moment(timestamp * 1000).format('YYYY-MM-DD')
        }
    },
    created(){
        this.$http.get(uri.getDetail + "?filmId=" + this.$route.params.filmId)
        .then((ret) => {
            if(ret.status == 0){
                this.filmInfo = ret.data.film;
                console.log(this.filmInfo)
            } else{
                Toast.fail(ret.msg)
            }
        })
    }
}
</script>
<style lang="scss" scoped>
    .headBox{
        overflow: hidden;
    }
    .headImg{
        width: 100%;
        margin-top: -40%;
        margin-bottom: -45%;
    }
</style>