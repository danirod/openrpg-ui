import { action } from '@storybook/addon-actions'
import SuccessMessage from './SuccessMessage.vue'

export default {
  title: 'SuccessMessage'
}

export const withMessage = () => ({
  components: { SuccessMessage },
  template: `<success-message :success="true" successMessage="Jugador creado" />`
})

export const closeable = () => ({
  components: { SuccessMessage },
  methods: {
    handleClick: action('clicked')
  },
  template: `<success-message :success="true" successMessage="Jugador creado" @click="handleClick" />`
})
