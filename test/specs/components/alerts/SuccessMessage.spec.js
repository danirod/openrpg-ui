import { mount } from '@vue/test-utils'
import test from 'ava'
import SuccessMessage from '@/components/alerts/SuccessMessage.vue'

test('renders valid DOM', (t) => {
  const wrapper = mount(SuccessMessage, {
    propsData: {
      success: true,
      successMessage: 'Jugador correctamente metido'
    }
  })
  t.snapshot(wrapper.html())
})
