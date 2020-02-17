<template>
  <div>
    <div class="col-12">
      <hamburguer-menu
        :overlay="hidden"
        @click.native="hidden = !hidden"
      ></hamburguer-menu>
      <overlay :hidden="hidden"> </overlay>
      <radial-menu :hidden="hidden"></radial-menu>
    </div>
  </div>
</template>

<script>
import HamburguerMenu from '~/components/desktop_menu/HamburguerMenu'
import RadialMenu from '~/components/desktop_menu/RadialMenu'
import Overlay from '~/components/layers/overlay'

export default {
  components: {
    HamburguerMenu,
    Overlay,
    RadialMenu
  },
  data() {
    return {
      hidden: true
    }
  }
}
</script>

<style scoped></style>
