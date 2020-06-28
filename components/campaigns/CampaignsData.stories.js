import CampaignsData from './CampaignsData.vue'

export default {
  title: 'Campaigns/CampaignsData'
}

const data = {
  title: 'Las torres desalmadas',
  description: 'Nadie sale con vida de estas torres para contar lo que ve.',
  id: 2341
}

export const campaign = () => ({
  components: { CampaignsData },
  template: `<campaigns-data :campaign="campaign" />`,
  data() {
    return {
      campaign: data
    }
  }
})
