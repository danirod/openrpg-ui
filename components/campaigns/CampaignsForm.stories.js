import { action } from '@storybook/addon-actions'

import CampaignsForm from './CampaignsForm.vue'

export default {
  title: 'Campaigns/CampaignsForm'
}

const campaign = {
  title: 'Las torres desalmadas',
  description: 'Nadie sale con vida de estas torres para contar lo que ve.',
  id: 2341
}

export const newCampaign = () => ({
  components: { CampaignsForm },
  methods: {
    onSubmit: action('submit'),
    onCancel: action('cancel')
  },
  template:
    '<campaigns-form submit-text="Crear" @submit="onSubmit" @cancel="onCancel" />'
})

export const existingCampaign = () => ({
  components: { CampaignsForm },
  methods: {
    onSubmit: action('submit'),
    onCancel: action('cancel')
  },
  data() {
    return { campaign }
  },
  template:
    '<campaigns-form submit-text="Actualizar" :model="campaign" @submit="onSubmit" @cancel="onCancel" />'
})
