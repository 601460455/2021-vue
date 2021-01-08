import axios from 'axios'
import store from '@/store/index'

axios.interceptors.response.use((ret) => {
    if (ret.data._token) {
        store.commit('global/setJwt', ret.data._token)
    }
    return ret.data || ret
})

axios.interceptors.request.use((cfg) => {
    cfg.headers['authorization'] = store.state.global._token
    return cfg
})

export default axios