<template>
  <form id="campaign_form" @submit.prevent="submit">
    <vue-form-generator
      :schema="schema"
      :model="model"
      :options="formOptions"
    />
    <b-button type="submit" variant="success">{{ submitText }}</b-button>
    <b-button v-if="cancelUrl" variant="link" :to="cancelUrl">{{
      cancelText
    }}</b-button>
    <b-button v-else variant="link" @click="cancel">{{ cancelText }}</b-button>
  </form>
</template>

<script>
import VueFormGenerator from 'vue-form-generator'

import schema from '../../schemas/campaign'

export default {
  name: 'CampaignsForm',
  components: {
    'vue-form-generator': VueFormGenerator.component
  },
  props: {
    model: {
      type: Object,
      required: false,
      default: () => ({})
    },
    submitText: {
      type: String,
      required: false,
      default: 'Enviar'
    },
    cancelText: {
      type: String,
      required: false,
      default: 'Cancelar'
    },
    cancelUrl: {
      type: String,
      required: false,
      default: null
    }
  },
  data() {
    return {
      schema,
      formOptions: {
        validateAfterLoad: true,
        validateAsync: true
      }
    }
  },
  methods: {
    submit() {
      this.$emit('submit', this.model)
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>
