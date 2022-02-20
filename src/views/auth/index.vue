<template>

  <div style="margin: 100px auto; width: 500px">


    <div class="form-group form-floating-label" :class="{'has-error': $v.user.userName.$error}">
      <input
        :disabled="loginButton"
        id="userName"
        v-model="$v.user.userName.$model"
        type="text" class="form-control input-border-bottom" required>
      <label for="userName" class="placeholder">Kullanıcı Adı</label>
    </div>

    <br>

    <div class="form-group form-floating-label" :class="{'has-error': $v.user.password.$error}">
      <input
        :disabled="loginButton"
        id="password"
        v-model="$v.user.password.$model"
        type="password" class="form-control input-border-bottom" required>
      <label for="password" class="placeholder">Parola Adı</label>
    </div>
    <input type="hidden" id="recaptchaId" value="">
    <b-button
      class="login"
      variant="primary"
      @click="login"
      :disabled="$v.user.$invalid || loginButton"
    >{{ button }}
    </b-button>
  </div>


</template>
<script>

import {required} from "vuelidate/lib/validators";


export default {
  data() {
    return {
      user: {
        userName: null,
        password: null
      },
      button: 'Giriş Yap',
      loginButton: false,
    }
  },
  mounted() {
    this.recaptcha()
  },
  methods: {
    recaptcha() {
      window.grecaptcha.ready(function () {
        window.grecaptcha.execute('6LcXclceAAAAAE7aGkuoq7MxqGUbNpoVnUDloczo', {action: 'login'}).then(function (token) {
          document.getElementById("recaptchaId").value = token;
        });
      });
    },
    login() {
      this.button = 'Yükleniyor...'
      this.loginButton = true

      const recaptcha = document.getElementById("recaptchaId").value


      let login = {
        user: {
          userName: this.user.userName,
          password: this.user.password,
        },
        recaptcha: {recaptcha}
      }


      this.$store.dispatch('login', login)
        .then(response => {
          if (response === false) {
            this.$store.dispatch('alert', 'warning')
            this.button = 'Giriş Yap'
            this.loginButton = false
            this.recaptcha()
          }
        })


    },
  },
  metaInfo() {
    return {
      title: 'Login',
      link: [
        {rel: 'icon', href: 'https://storage.cloud.google.com/noxus-up-file/noxusico.png', type: "image/x-icon"}
      ],
    }
  },
  validations: {
    user: {
      userName: {required},
      password: {required}
    }
  }
}
</script>
<style scoped>
.login {
  margin-top: 25px;
  position: relative;
  left: 200px;
}

</style>
