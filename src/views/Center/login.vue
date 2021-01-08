<template>
    <div>
        <div class="headerImg">
            <img src="https://assets.maizuo.com/h5/mz-auth/public/app/img/logo.19ca0be.png" height="60">
        </div>
       <van-form @submit="onSubmit">
  <van-field
    v-model="mobile"
    name="mobile"
    label="手机号"
    placeholder="手机号"
    :rules="[{ pattern, required: true, message: '请输入手机号' }]"
  />
  <van-field
    v-model="password"
    type="password"
    name="验证码"
    label="验证码"
    placeholder="验证码"
    :rules="[{ required: true, message: '请填写验证码' }]"
  />
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit" class="button">登陆</van-button>
  </div>
</van-form>
    </div>
</template>

<script>
import Vue from 'vue';
import { Form , Field, Button, Toast } from 'vant';

Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(Toast)

export default {
    data() {
    return {
      mobile: '',
      password: '',
      pattern: /^1[3-9]\d{9}$/
    };
  },
  methods: {
    onSubmit(values) {
      this.$http.post('http:http://127.0.0.1:2004/backend/login',values)
      .then((ret) => {
        if(ret.error_code == 0){
          Toast.success('登陆成功')
          if(this.$route.query.callback){
            this.$router.push(this.$router.query.callback)
          } else {
            this.$router.push('/center')
          }
        } else{
          Toast.fail('登陆失败！ ')
        }
      })
    },
  },
   created() {
        // 进入时，隐藏底部导航
        this.$store.commit("global/setFooter", false);
    },

    beforeDestroy() {
        // 离开时，显示底部导航
        this.$store.commit("global/setFooter", true);
    },
}
</script>

<style lang="scss" scoped>
    .headerImg{
        margin-top: 79px;
        margin-bottom: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .button{
        margin-top: 50px;
        background-color: #ff5f16;
        border: 1px solid #ff5f16;
        border-radius: 3px;
    }
</style>