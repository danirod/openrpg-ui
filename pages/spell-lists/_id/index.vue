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
      <div class="row">
        <div class="col-md-12">
          <SpellsTable :spells="spells" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '~/api/spell-lists'
import * as spellsApi from '~/api/spells'
import SpellsTable from '~/components/SpellsTable'

export default {
  components: {
    SpellsTable
  },
  data() {
    return {
      spells: [],
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
    this.spellList = await this.fetchList()
    this.spells = await this.fetchSpells()
  },
  methods: {
    async fetchList() {
      try {
        return await api.retrieveSpellList(
          this.id,
          this.$axios,
          api.RetrieveSpellListTypeEnrichedAdapter
        )
      } catch (err) {
        console.error('404 spell list not found', err)
      }
    },
    async fetchSpells() {
      try {
        return await spellsApi.fetchSpellsForList(this.id, this.$axios)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
