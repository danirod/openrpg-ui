<template>
  <div>
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
  name: 'SpellsTable',
  props: {
    spells: {
      type: Array,
      required: true,
      default: () => []
    },
    list_id: {
      type: Number,
      required: false,
      default: () => null
    }
  },
  data() {
    return {
      // Table related
      spellConfirm: { name: '', level: '' },
      allSpells: [],
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
  methods: {
    async fetchSpells() {
      // eslint-disable-next-line
      this.spells = await api.fetchSpells()
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
