<template>
 <div class="container"> 
      <van-pull-refresh
            v-model="isLoading2"
            success-text="刷新成功"
            @refresh="onRefresh"
        >
     <div class="loading" v-show="isLoading">
         <van-loading size="30px" class="loading" v-show="isLoading">加载中...</van-loading>
     </div>
  <van-card v-for="item in list" :key="item.filmId" @click="goDetail(item.filmId)">
      <template #thumb>
          <img :src="item.poster" width="66">
      </template>
      <template #title>
          <div class="title">
              {{item.name}}
              <span class="item"> {{item.filmType.name}} </span>
          </div>
      </template>
      <template #desc>
          <div class="desc">
              <div>
                  观众评分 <span class="grade"> {{item.grade}} </span>
              </div>
              <div>主演：{{ item.actors | parseActors}} </div>
              <div> {{item.nation}} | {{ item.runtime }} 分钟 </div>
              <div class="nowPlayingFilm-buy">购票</div>
          </div> 
      </template>
</van-card>
</van-pull-refresh>
 </div>
</template>

// <script>
import uri from '@/config/uri'
import Vue from 'vue';
import { Card, Toast, Loading, PullRefresh} from 'vant';

Vue.use(Card);
Vue.use(Toast);
Vue.use(Loading);
Vue.use(PullRefresh);
export default {
    data() {
        return {
            list:[],
            isLoading: true,
            isLoading2: true,
            pageNum: 1
        }
    },
    methods:{
        onRefresh() {
            // 发起请求获取数据
            this.getData();
            console.log(11)
        },
        getData(){
            this.$http.get(uri.getNowPlaying + '?pageNum=' + this.pageNum)
            .then(ret => {
                console.log(ret)
                if(ret.status == 0){
                    if(this.pageNum <= Math.ceil(ret.data.total / 10)){
                        this.list = [...ret.data.films, ...this.list]
                        this.pageNum++
                    }
                } else {
                    Toast.fail('网络繁忙')
                }
                this.isLoading = false
                this.isLoading2 = false
            })
        },
        goDetail(filmId){
            this.$router.push('/film/' + filmId)
        }
    },
    filters:{
        parseActors(actors){
            if(actors){
                var str = ''
                actors.forEach(el => {
                    str += el.name + ' '
                });
                return str.substr(0, 15) + '...'
            } else {
                return '暂无主演'
            }
        }
    },
    created() {
        // this.$http.get(uri.getNowPlaying).then((ret) =>{
        //     if(ret.status === 0){
        //         this.list = ret.data.films
        //         console.log(this.list)
        //     } else {
        //         Toast.fail('网络繁忙')
        //       }
        //     this.isLoading = false
        // })
        this.getData()
    },
}
</script>

<style lang="scss" scoped>
    .loading{
        text-align: center;
        margin-top: 5px;
    }

img {
    border-radius: 0;
}
// 样式设置
.title {
    font-size: 16px;
    color: black;
}
.item {
    font-size: 9px;
    color: #fff;
    background-color: #d2d6dc;
    height: 14px;
    line-height: 14px;
    padding: 0 2px;
    border-radius: 2px;
    margin-top: 6px;
}
.grade {
    color: #ffb232;
    font-size: 14px;
    margin-top:6px;
}
.desc {
    font-size: 13px;
    margin-top:6px;
}
.nowPlayingFilm-buy {
    float: right;
    line-height: 25px;
    height: 25px;
    width: 50px;
    color: #ff5f16;
    font-size: 13px;
    text-align: center;
    border-radius: 2px;
    position: relative;
    border: 1px solid #ff5f16;
    top: -40px;
    right: 0px;
    border-radius: 4px;
}
.van-card{
    padding: 15px 8px 5px 16px;
    margin-top: 0px;
    border-top: 1px solid #ededed;
}
.van-card__thumb{
    width: 68px; 
}
.container{
    margin-bottom: 50px;
}
</style>