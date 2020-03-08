<template>
  <div>
    <validation-errors
      v-if="validationErrors"
      :errors="validationErrors"
    ></validation-errors>
    <success-message
      v-if="success"
      :success="success"
      :successMessage="successMessage"
    ></success-message>
    <div class="panel-body">
      <form @submit.prevent="submitForm">
        <vue-form-generator
          :schema="schema"
          :model="model"
          :options="formOptions"
        ></vue-form-generator>
        <b-button type="submit">Crear lista de hechizo</b-button>
      </form>
    </div>
  </div>
</template>

<script>
import VueFormGenerator from 'vue-form-generator'
import { rolemaster } from '~/config'
import * as api from '~/api/spell-lists'

import SuccessMessage from '~/components/alerts/SuccessMessage'
import ValidationErrors from '~/components/alerts/ValidationErrors'

import schema from '~/schemas/spell-list'

export default {
  components: {
    ValidationErrors,
    SuccessMessage,
    'vue-form-generator': VueFormGenerator.component
  },
  data() {
    return {
      model: {},
      schema,
      formOptions: {
        validateAfterLoad: true,
        validateAsync: true
      },
      errors: [],
      validationErrors: '',
      success: false,
      successMessage: '',
      rolemaster
    }
  },
  methods: {
    async submitForm(e) {
      try {
        await api.createSpellList(this.model, this.$axios)
        this.validationErrors = ''
        this.success = true
        this.successMessage = 'spell list created successfully'
      } catch (err) {
        this.success = false
        this.successMessage = ''
        if (err.code === 422) {
          this.errors.push(err.data)
          this.validationErrors = err.data
        }
      }
    }
  }
}
</script>

<style></style>
