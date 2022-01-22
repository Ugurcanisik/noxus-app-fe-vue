<template>
  <div style="margin: 110px auto; width: 500px">

    <div class="form-group form-floating-label" :class="{'has-error': $v.user.userName.$error}">
      <input
        id="userName"
        v-model="$v.user.userName.$model"
        type="text" class="form-control input-border-bottom" required>
      <label for="userName" class="placeholder">Kullanıcı Adı</label>
    </div>

    <br>

    <div class="form-group form-floating-label" :class="{'has-error': $v.user.password.$error}">
      <input
        id="password"
        v-model="$v.user.password.$model"
        type="text" class="form-control input-border-bottom" required>
      <label for="password" class="placeholder">Parola Adı</label>
    </div>
    <b-button
      class="login"
      variant="primary"
      @click="login"
      :disabled="$v.user.$invalid"
    >Giriş Yap
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
      }
    }
  },
  methods: {
    login() {
      let login = {
        userName: this.user.userName,
        password: this.user.password
      }
      this.$store.dispatch('login', login)
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
