<template>
  <div>
    <b-button to="/campaigns/create" variant="success">Nueva campaña</b-button>
    <campaigns-table />
  </div>
</template>

<script>
import CampaignsTable from '~/components/campaigns/CampaignsTable'

export default {
  components: { CampaignsTable }
}
</script>
