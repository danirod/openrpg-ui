import SuccessMessage from './SuccessMessage.vue'

export default { title: 'SuccessMessage' }

export const withMessage = () => ({
  components: { SuccessMessage },
  template: `<success-message :success="true" successMessage="Jugador creado" />`
})
