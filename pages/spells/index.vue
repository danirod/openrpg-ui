<template>
  <div>
    <div>
      <b-form-group
        label="Buscar"
        label-cols-sm="3"
        label-size="sm"
        label-for="search-box"
        class="mb-0"
      >
        <b-input-group size="sm">
          <b-form-input
            id="search-box"
            v-model="search"
            @input="onChange"
            class="w-75"
          />
        </b-input-group>
      </b-form-group>
    </div>
    <div>
      <b-table
        id="spell-table"
        ref="spell_table"
        :items="spells"
        :fields="fields"
        show-empty
        empty-text="No hay hechizos que cuadren con los filtros"
        busy.sync="true"
      >
        <template v-slot:cell(actions)="row">
          <router-link :to="{ name: 'spells-id', params: { id: row.item.id } }">
            <b-button size="sm" class="mr-1">Ver</b-button>
          </router-link>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import * as api from '~/api/spells'

export default {
  name: 'SpellsAutocomplete',
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      }
    }
  },
  props: {
    suggestions: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data() {
    return {
      // Table related
      allSpells: [],
      spells: [],
      fields: [
        { key: 'list_name' },
        { key: 'level' },
        { key: 'name' },
        { key: 'actions' }
      ],
      // Search related
      isOpen: false,
      search: ''
    }
  },
  async mounted() {
    await this.fetchSpells()
    this.allSpells = this.spells
  },
  methods: {
    async fetchSpells() {
      this.spells = await api.fetchSpells()
    },
    onChange() {
      const payload = this.search.trim()
      if (payload.length > 0) {
        api
          .fetchSpellSuggestions(this.search.trim())
          .then(this.handleSuggestionsReceived)
          .catch((err) => console.error(err))
      } else {
        this.matches = []
        this.isOpen = false
        this.spells = [...this.allSpells]
      }
    },
    handleSuggestionsReceived(suggs) {
      this.isOpen = true
      const matches = new Map(suggs.map((sg) => [sg.id, true]))
      this.spells = this.allSpells.filter((s) => matches.get(s.id))
    }
  }
}
</script>
