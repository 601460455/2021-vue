<template>
 <div id="app">
   
   <Footer v-show="isShow"></Footer>
   <router-view></router-view>
   </div> 
</template>
<script>
import Footer from './components/Navigation/Footer.vue'
//倒入uri地址模块（测试网络请求）
// import uri from '@/config/uri'

export default {
  components: { Footer },

//  测试网络模块
//   created() {
//     this.$http.get(uri.getCities).then(ret => console.log(ret))
//   },
  computed:{
  isShow(){
    return this.$store.state.global.isShowFooter
  }
}
}
</script>
<style lang="scss">

</style>