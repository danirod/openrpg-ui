import { configure } from '@storybook/vue'
import Vue from 'vue'

// Vue plugins
import { IconsPlugin, BootstrapVue } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

// Third party CSS
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Storybook
configure(require.context('../components', true, /\.stories\.js$/), module)
