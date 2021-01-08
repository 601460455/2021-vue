<template>
    <div>
        <van-index-bar :index-list="indexList">
            <template v-for="(item, index) in dataList">
                <!-- index为索引，item为城市信息集合 -->
                <van-index-anchor :index="index" :key="index">{{
                    item.title
                }}</van-index-anchor>
                <!-- item.data就是城市信息 -->
                <van-cell
                    v-for="city in item.data"
                    :key="city.cityId"
                    :title="city.name"
                    @click="changeCity(city.cityId)"
                />
            </template>
        </van-index-bar>
    </div>
</template>

<script>
import Vue from "vue";
import { IndexBar, IndexAnchor, Cell } from "vant";
Vue.use(IndexBar);
Vue.use(IndexAnchor);
Vue.use(Cell)

import uri from "@/config/uri"
export default {
    data(){
        return {
            indexList:[],
            dataList: [],
            charList:[]
        }
    },
    methods:{
        changeCity(cityId){
            console.log(cityId)
        }
    },
    created(){
        this.$store.commit('global/setFooter', false)

        this.$http.get(uri.getCities).then((ret) =>{
            if(ret.status == 0){
                for(let i = 65; i <= 90; i++){
                    this.charList.push(String.fromCharCode(i))
                }
                this.charList.forEach(el =>{
                    let tmp = ret.data.cities.filter( 
                        (item) => el.toLowerCase() == item.pinyin.substr(0, 1)
                    )
                    if(tmp.length > 0){
                        this.indexList.push(el)
                        this.dataList.push({
                            title:el,
                            data:tmp
                        })
                    }

                })
            }
        })
    },
      beforeDestroy() {
        // 让底部导航显示
        this.$store.commit("global/setFooter", true);
    },
}
</script>