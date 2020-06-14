<template>
  <b-card>
    <p>
      <strong>{{ campaign.title }}</strong>
    </p>
    <p>{{ campaign.description }}</p>
  </b-card>
</template>

<script>
export default {
  name: 'CampaignsData',
  props: {
    campaign: {
      type: Object,
      required: true
    }
  }
}
</script>
