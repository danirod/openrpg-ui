<template>
  <div>
    <validation-errors v-if="validationErrors" :errors="validationErrors" />
    <success-message
      v-if="success"
      :success="success"
      :success-message="success"
    />
    <div class="panel-body">
      <campaigns-form
        submit-text="Crear campaña"
        cancel-url="/campaigns"
        @submit="submit"
      />
    </div>
  </div>
</template>

<script>
import { createCampaign } from '~/api/campaigns'

import SuccessMessage from '~/components/alerts/SuccessMessage'
import ValidationErrors from '~/components/alerts/ValidationErrors'
import CampaignsForm from '~/components/campaigns/CampaignsForm'

export default {
  components: { CampaignsForm, ValidationErrors, SuccessMessage },
  data() {
    return {
      success: null,
      validationErrors: []
    }
  },
  methods: {
    async submit(campaign) {
      this.success = false
      this.validationErrors = []

      try {
        const response = await createCampaign(this.$axios, campaign)
        this.validationErrors = []
        this.success = response
      } catch (e) {
        this.success = false
        if (e.errors) {
          this.validationErrors = e.errors
        }
      }
    }
  }
}
</script>
