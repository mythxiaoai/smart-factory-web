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

      <a-row :gutter="0">
        <a-col :span="16">
          <a-form-item>
            <a-input
              v-decorator="['captcha',{rules: [{ required: true, message: '请输入验证码!'}]}]"
              size="large"
              type="text"
              @change="inputCodeChange"
              placeholder="请输入验证码"
            >
              <a-icon slot="prefix" type="smile" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="8" style="text-align: right">
          <span
            v-if="requestCodeSuccess"
            style="margin-top: 2px;display:inline-block;"
            v-html="randCodeImage"
            @click="handleChangeCheckCode"
          ></span>
          <img
            v-else
            style="margin-top: 2px;"
            src="@/assets/imgs/checkcode.png"
            @click="handleChangeCheckCode"
          />
        </a-col>
      </a-row>

      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
        >确定</a-button>
        <img v-html="randCodeImage"/>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import md5 from 'md5'
import { mapActions } from 'vuex'
import { HOMEPATH, appId } from '@/assets/config/appConfig.js'
export default {
  layout: 'login',
  data() {
    return {
      form: this.$form.createForm(this),
      state: {
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
      },
      randCodeImage: '',
      requestCodeSuccess: false,
      checkKey:null,
    }
  },
  created() {
    this.handleChangeCheckCode();
    
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
          values.appId = appId;
          values.checkKey = this.checkKey;
          this.$api.login.login(values).then((res) => {
            if (res.success) {
              this.$store.dispatch('security/saveToken', 666)
              const redirect = this.$route.query.redirect || HOMEPATH
              this.$router.push(redirect)
            } else {
              state.loginBtn = false
              //用户名密码输错
              res.message != "验证码错误" && this.handleChangeCheckCode()
            }
          })
        } else {
          setTimeout(() => {
            state.loginBtn = false
            //报错刷新验证码
            this.handleChangeCheckCode()
          }, 600)
        }
      })
    },
    inputCodeChange(e) {
      this.inputCodeContent = e.target.value
    },
    handleChangeCheckCode() {
      this.checkKey = md5(Date.now());
      this.$api.login.verify({ key: this.checkKey})
        .then(res => {
          console.log(1);
          console.log(this.checkKey);
          console.log(res);
          this.randCodeImage = res.result
          this.requestCodeSuccess = true
        })
        .catch(() => {
          this.requestCodeSuccess = false
        })
    },
  },
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
