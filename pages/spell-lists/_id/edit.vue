<template>
  <div>
    <div>
      <nuxt-link to="/spell-lists/">
        <b-button size="sm" class="mr-1">Listas de hechizos</b-button>
      </nuxt-link>
    </div>
    <div>
      <validation-errors
        v-if="validationErrors"
        :errors="validationErrors"
      ></validation-errors>
      <success-message
        v-if="success"
        :success="success"
        :success-message="successMessage"
      ></success-message>
      <div class="panel-body">
        <form @submit.prevent="submitForm">
          <vue-form-generator
            :schema="schema"
            :model="model"
            :options="formOptions"
          ></vue-form-generator>
          <b-button type="submit">Editar lista de hechizo</b-button>
        </form>
      </div>
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
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  async mounted() {
    try {
      const spellList = await api.retrieveSpellList(this.id, this.$axios)
      this.validationErrors = null
      this.initial = spellList
      this.model = spellList
    } catch (e) {
      this.success = false
      this.successMessage = ''
      this.validationErrors = e.data
    }
  },
  methods: {
    async submitForm(e) {
      try {
        await api.updateSpellList(this.id, this.model, this.$axios)
        this.validationErrors = ''
        this.success = true
        this.successMessage = 'spell list edited successfully'
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
