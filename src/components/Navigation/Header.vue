<template>
    <div :class=" { header: isSticky } ">
        <van-tabs @click="onClick" line-width='55px' v-model="active">
        <van-tab title="正在热映"></van-tab>
        <van-tab title="准备上映"></van-tab>
</van-tabs>
    </div>
</template>

<script>
import Vue from 'vue';
import { Tab, Tabs } from 'vant';

Vue.use(Tab);
Vue.use(Tabs);
export default {
    data() {
        return {
            active:0,
            urls:["/films/nowPlaying", "/films/comingSoon"],
            isSticky:false
        }
    },
    created() {
        this.active = this.urls.indexOf(this.$route.path)
    },
    mounted(){
        window.addEventListener('scroll', ()=>{
            let scrollTop = document.documentElement.scrollTop
            if(scrollTop >= 150){
                this.isSticky = true
            } else {
                this.isSticky = false
            }
        })

    },
     methods: {
            onClick(index) {
                // this.$router.push(this.urls[2])
                this.$router.push(this.urls[index])
            },
     },
}
</script>
<style lang="scss" scoped>
.header{
    position: fixed;
    z-index: 999;
    width: 100%;
}
    
</style>