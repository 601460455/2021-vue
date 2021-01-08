<template>
    <div>
        <h1>这里是VUEX界面</h1>
         <button @click="clickHander">点 点 点</button>
         <button @click="clickTwo">哒 哒 哒</button>
    </div>
</template>

<script>
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
export default {
    created(){
        // console.log(this.$store.state.num)
        // console.log(this.$store.state.num2)
    },
    computed:{
        ...mapState(['num', 'num2']),
        ...mapGetters(['ageIsAdult']),
        ...mapState('user', ['username', 'age', 'gander']),
        ...mapGetters('user', ['isAdult']),
    },
    methods:{
        ...mapMutations(['setNum', 'setNum2']),
        ...mapActions(['asyncSetNum2']),
        clickHander(){
            // this.$store.commit('setNum', 5)
            // this.$store.commit('setNum2', -5)
            // this.$store.dispatch('asyncSetNum2', 50)
            // this.asyncSetNum2(70)
            // console.log(this.$store.getters.ageIsAdult)
            // console.log(this.ageIsAdult)
        },
            ...mapMutations('user', ['setUsername']),
            ...mapActions('user', ['asyncSetAge']),
        clickTwo(){
            // console.log(this.$store.state.user.username)
            // console.log(this.username)

            // this.$store.commit('user/setUsername', 'bobo')
            // this.setUsername('xiaoming')

            // this.$store.dispatch('user/asyncSetAge', 20)
            // this.asyncSetAge(11)
            // console.log(this.$store.getters['user/isAdult'])
            console.log(this.isAdult)
        }
    },
    mounted(){
        this.setNum(10)
        this.setNum2(10)
        // console.log(this.num)
        // console.log(this.num2)
    }
}
</script>