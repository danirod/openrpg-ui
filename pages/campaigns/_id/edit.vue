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
        submit-text="Actualizar campaña"
        :model="campaign"
        :cancel-url="`/campaigns/${campaign.id}`"
        @submit="submit"
      />
    </div>
  </div>
</template>

<script>
import { fetchCampaign, updateCampaign } from '~/api/campaigns'

import SuccessMessage from '~/components/alerts/SuccessMessage'
import ValidationErrors from '~/components/alerts/ValidationErrors'
import CampaignsForm from '~/components/campaigns/CampaignsForm'

export default {
  components: { CampaignsForm, ValidationErrors, SuccessMessage },
  async asyncData({ $axios, route }) {
    const campaign = await fetchCampaign($axios, route.params.id)
    return { campaign: campaign.data }
  },
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
        const response = await updateCampaign(
          this.$axios,
          this.campaign.id,
          campaign
        )
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
