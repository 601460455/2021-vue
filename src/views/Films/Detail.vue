<template>
    <div>
        <!-- 显示图片 -->
        <div class="headBox">
            <img v-lazy='filmInfo.poster'  class="headImg">
        </div>
        <!-- 电影介绍 -->
       <div class="film-detail">
      <span class="col" v-if="filmInfo.name">
        <span class="name">{{ filmInfo.name }}</span>
        <span class="item">{{filmInfo.filmType.name}}</span>
      </span>
      <span class="film-grade">
        <span class="grade">{{filmInfo.grade}}</span>
        <span class="grade-text">分</span>
      </span>
      <div class="grey-text">{{ filmInfo.category }}</div>
      <div class="grey-text">{{ filmInfo.premiereAt | parsePermiereAt }} 上映</div>
      <div class="grey-text">{{ filmInfo.nation }} | {{ filmInfo.runtime }} 分钟</div>
      <div class="grey-text">{{ filmInfo.synopsis }}</div>
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
                <div id="bigImg" slot="photo" class="swiper-slide" v-for="(item, index) in filmInfo.photos" :key="index" >
                    <img :src="item" height="100" alt="">
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
import { mapMutations } from 'vuex'
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
    methods: {
        ...mapMutations('global', ['setFooter'])
    },
    created(){
        this.$http.get(uri.getDetail + "?filmId=" + this.$route.params.filmId)
        .then((ret) => {
            if(ret.status == 0){
                this.filmInfo = ret.data.film;
            } else{
                Toast.fail(ret.msg)
            }
        })
        this.setFooter(false)
    },
    beforeDestroy() {
        this.setFooter(true)
    },
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
    #bigImg{
        height: 100%;
    }
    .film-detail{
    padding: 15px;
    padding-top: 12px;
    background-color: #fff;
    float: left;
}
.film-grade {
    width: calc(100% - 250px);
    text-align: right;
    color: #ffb232;
    float: right;
}
.grade {
  font-size: 18px;
  font-style: italic;
}
.grade-text {
  font-size: 10px;
}
.grey-text {
  font-size: 13px;
    color: #797d82;
    margin-top: 4px;
}
</style>