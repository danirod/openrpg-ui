import { mount } from '@vue/test-utils'
import test from 'ava'
import CampaignsData from './CampaignsData.vue'

test('snapshot', (t) => {
  const wrapper = mount(CampaignsData, {
    propsData: {
      campaign: {
        id: 10,
        title: 'Las torres desalmadas',
        description: 'Nadie sale con vida para contar lo que ve dentro.'
      }
    }
  })
  t.snapshot(wrapper.html())
})
