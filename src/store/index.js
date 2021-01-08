import Vue from 'vue'
import Vuex from 'vuex'

import user from "./modules/user"
import global from './modules/global'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        num: 10,
        num2: 100
    },
    mutations: {
        setNum(state, arg) {
            state.num += arg
        },
        setNum2(state, arg) {
            state.num2 += arg
        }
    },
    actions: {
        asyncSetNum2(context, arg) {
            setTimeout(() => {
                context.commit('setNum2', arg)
            }, 1000)
        }
    },
    getters: {
        ageIsAdult(state) {
            return state.age >= 18 ? '成年' : '未成年'
        }
    },
    modules: {
        user,
        global
    }
})