<template>
  <div>
    <div>
      <nuxt-link to="/spells/create">
        <b-button size="sm" class="mr-1">Crear</b-button>
      </nuxt-link>
    </div>
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
            class="w-75"
            @input="onChange"
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
          <router-link
            :to="{ name: 'spells-id-edit', params: { id: row.item.id } }"
          >
            <b-button size="sm" class="mr-1">Editar</b-button>
          </router-link>
          <b-button size="sm" class="mr-1" @click="confirmDeleteSpell(row.item)"
            >Delete
          </b-button>
        </template>
      </b-table>
    </div>
    <b-modal id="modal-confirm-delete" ref="modal-confirm-delete" hide-footer>
      <div class="d-block text-center">
        <p>
          ¿Quieres borrar
          <b>{{ spellConfirm.level }}. {{ spellConfirm.name }}</b
          >?
        </p>
        <b-button size="md" variant="success" @click="ok(spellConfirm.id)"
          >OK</b-button
        >
        <b-button size="md" variant="danger" @click="cancel()">Cancel</b-button>
      </div>
    </b-modal>
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
      spellConfirm: { name: '', level: '' },
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
    },
    confirmDeleteSpell({ id, name, level }) {
      this.spellConfirm = {
        id,
        name,
        level
      }
      this.$refs['modal-confirm-delete'].show()
    },
    async ok(id) {
      try {
        await api.deleteSpell(id, this.$axios)
        this.$bvModal.hide('modal-confirm-delete')
        await this.fetchSpells()
      } catch (err) {
        console.error(err)
        if (err.response.status === 403) {
          this.$bvModal.hide('modal-confirm-delete')
          this.spellConfirm = {}
          this.validationErrors.push(err.data.message)
        }
      }
    },
    cancel() {
      this.$bvModal.hide('modal-confirm-delete')
      this.spellConfirm = {}
    }
  }
}
</script>
