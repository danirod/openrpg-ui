<template>
  <div class="panel-body">
    <div class="container-fluid">
      <h1>Iniciar sesión</h1>
      <b-alert :show="error" variant="danger">{{ error }}</b-alert>
      <form @submit.prevent="submitForm">
        <div class="row my-1">
          <div class="col-sm-3">
            <label for="character-name">E-mail</label>
          </div>
          <div class="col-sm-4">
            <b-form-input id="email" v-model="email"></b-form-input>
          </div>
          <div class="col-sm-5"></div>
        </div>
        <div class="row my-1">
          <div class="col-sm-3">
            <label for="experience">Password</label>
          </div>
          <div class="col-sm-4">
            <b-form-input
              id="password"
              v-model="password"
              type="password"
            ></b-form-input>
          </div>
          <div class="col-sm-5"></div>
        </div>
        <div class="row my-1">
          <b-button type="submit">Iniciar sesión</b-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async submitForm() {
      this.error = null
      try {
        await this.$auth.login({
          data: {
            email: this.email,
            password: this.password
          }
        })
      } catch (e) {
        this.error = 'Usuario y contraseña no correctos'
      }
    }
  }
}
</script>

<style></style>
