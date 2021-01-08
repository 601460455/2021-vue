export default {
    namespaced: true,
    state: {
        isShowFooter: true
    },
    mutations: {
        setFooter(state, arg) {
            state.isShowFooter = arg
        }
    },
    actions: {},
    getters: {}
}