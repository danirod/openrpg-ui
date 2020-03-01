<template>
  <div>
    <h2>Editar usuario {{ model.name }}</h2>
    <validation-errors
      v-if="validationErrors"
      :errors="validationErrors"
    ></validation-errors>
    <success-message
      v-if="success"
      :success="success"
      :success_message="success_message"
    ></success-message>
    <i>Dejar los campos password sin rellenar si no se quiere resetear</i>
    <div class="panel-body">
      <form @submit="submitForm">
        <vue-form-generator
          :schema="schema"
          :model="model"
          :options="formOptions"
        ></vue-form-generator>
        <b-button type="submit">Editar usuario</b-button>
      </form>
    </div>
  </div>
</template>

<script>
import VueFormGenerator from 'vue-form-generator'

import SuccessMessage from '~/components/alerts/SuccessMessage'
import ValidationErrors from '~/components/alerts/ValidationErrors'

import schema from '~/schemas/user'

export default {
  components: {
    ValidationErrors,
    SuccessMessage,
    'vue-form-generator': VueFormGenerator.component
  },
  data() {
    return {
      model: {
        name: '',
        email: '',
        password: '',
        repeat_password: ''
      },
      schema,
      formOptions: {
        validateAsync: true
      },
      success_message: '',
      submit_url: `/api/users/${this.$route.params.id}`,
      errors: [],
      success: false,
      validationErrors: ''
    }
  },
  mounted() {
    schema.fields[2].required = false
    schema.fields[3].required = false
    this.$axios
      .get(`/api/users/${this.$route.params.id}`)
      .then((res) => {
        this.model = res.data.data
      })
      .catch((err) => {
        this.errors.push(err)
      })
  },
  methods: {
    submitForm(e) {
      e.preventDefault()
      this.$axios
        .put(this.submit_url, this.model)
        .then((res) => {
          if (res.status === 200) {
            this.validationErrors = ''
            this.success = true
            this.success_message = res.data.message
          }
        })
        .catch((err) => {
          if (err.response.status === 422) {
            this.validationErrors = err.response.data.errors
          }
        })
    }
  }
}
</script>
