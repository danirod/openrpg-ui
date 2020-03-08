<template>
  <div>
    <div>
      <nuxt-link to="/spell-lists/">
        <b-button size="sm" class="mr-1">Listas de hechizos</b-button>
      </nuxt-link>
    </div>
    <div>
      <h2>{{ spellList.name }}</h2>
      <div class="row">
        <div class="col-md-4">
          Nombre:
          <span id="spell-name">{{ spellList.name }}</span>
        </div>
        <div class="col-md-4">
          Tipo:
          <span id="spell-list">{{ spellList.type.display }}</span>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          Description:
          <p>{{ spellList.description }}</p>
        </div>
        <div class="col-md-6">
          Notas:
          <p>{{ spellList.notes || '--' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '~/api/spell-lists'

export default {
  data() {
    return {
      spellList: {
        type: {}
      }
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  async mounted() {
    try {
      const spellList = await api.retrieveSpellList(
        this.id,
        this.$axios,
        api.RetrieveSpellListTypeEnrichedAdapter
      )
      console.log(this.spellList)
      this.spellList = spellList
    } catch (err) {
      console.error('404 spell list not found')
    }
  }
}
</script>
