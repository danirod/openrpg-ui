import { action } from '@storybook/addon-actions'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'
import SuccessMessage from './SuccessMessage.vue'

export default {
  title: 'SuccessMessage',
  decorators: [withKnobs]
}

export const withMessage = () => ({
  components: { SuccessMessage },
  template: `<success-message :success="true" successMessage="Jugador creado" />`
})

export const withCustomMessage = () => ({
  components: { SuccessMessage },
  props: {
    message: {
      default: text('Inner text', 'Jugador creado correctamente')
    },
    success: {
      default: boolean('Successful', true)
    }
  },
  template: `<success-message :success="success" :successMessage="message" />`
})

export const closeable = () => ({
  components: { SuccessMessage },
  methods: {
    handleClick: action('clicked')
  },
  template: `<success-message :success="true" successMessage="Jugador creado" @click="handleClick" />`
})
