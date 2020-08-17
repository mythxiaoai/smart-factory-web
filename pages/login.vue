<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="用户名"
          v-decorator="[
                'username',
                {rules: [{ required: true, message: '请输入帐户名' }]}
              ]"
        >
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          type="password"
          autocomplete="false"
          placeholder="密码"
          v-decorator="[
                'password',
                {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
              ]"
        >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-checkbox v-decorator="['rememberMe']">自动登录</a-checkbox>
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
        >确定</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import md5 from 'md5'
import { mapActions } from 'vuex'

export default {
  layout: 'login',
  data() {
    return {
      form: this.$form.createForm(this),
      state: {
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
      }
    }
  },
  created() {
  },
  methods: {
    //...mapActions(['Login', 'Logout']),
    handleSubmit(e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
      } = this
      state.loginBtn = true
      validateFields({ force: true }, (error, values) => {
        if (!error) {
          const loginParams = { ...values }
          loginParams.username= values.username
          loginParams.password = md5(values.password);
          this.$api.login.login(loginParams).then(res=>{
            //保存登陆状态
            console.log(res);
            return;
            this.$store.dispatch("security/save",666);
            const redirect = this.$route.query.redirect || "/";
            this.$router.push(redirect);
          }).finally(() => {
              state.loginBtn = false
          })
          
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
