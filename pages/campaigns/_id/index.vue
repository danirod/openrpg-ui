<template>
  <div>
    <p>
      <b-button to="/campaigns">Atrás</b-button>
      <b-button :to="`/campaigns/${campaign.id}/edit`">Editar</b-button>
    </p>
    <campaigns-data :campaign="campaign" />
  </div>
</template>

<script>
import { fetchCampaign } from '~/api/campaigns'
import CampaignsData from '~/components/campaigns/CampaignsData'

export default {
  components: { CampaignsData },
  async asyncData({ $axios, route }) {
    const campaign = await fetchCampaign($axios, route.params.id)
    return { campaign: campaign.data }
  }
}
</script>
