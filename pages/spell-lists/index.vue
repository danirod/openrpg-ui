<template>
  <div>
    <div>
      <nuxt-link to="/spell-lists/create">
        <b-button size="sm" class="mr-1">Crear</b-button>
      </nuxt-link>
    </div>
    <div>
      <b-table
        id="spell-table"
        ref="spell_table"
        :items="spellLists"
        :fields="fields"
        show-empty
        empty-text="No hay listas de hechizos que cuadren con los filtros"
        busy.sync="true"
      >
        <template v-slot:cell(actions)="row">
          <router-link
            :to="{ name: 'spell-lists-id', params: { id: row.item.id } }"
          >
            <b-button size="sm" class="mr-1">Ver</b-button>
          </router-link>
          <router-link
            :to="{ name: 'spell-lists-id-edit', params: { id: row.item.id } }"
          >
            <b-button size="sm" class="mr-1">Editar</b-button>
          </router-link>
          <b-button
            size="sm"
            class="mr-1"
            @click="confirmDeleteSpellList(row.item)"
            >Delete
          </b-button>
        </template>
      </b-table>
    </div>
    <b-modal id="modal-confirm-delete" ref="modal-confirm-delete" hide-footer>
      <div class="d-block text-center">
        <p>
          ¿Quieres borrar
          <b>{{ confirm.name }} ({{ confirm.type.display }})</b>?
        </p>
        <b-button size="md" variant="success" @click="ok(confirm.id)"
          >OK</b-button
        >
        <b-button size="md" variant="danger" @click="cancel()">Cancel</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import * as api from '~/api/spell-lists'

export default {
  data() {
    return {
      // Table related
      confirm: { name: '', type: '' },
      allSpellLists: [],
      spellLists: [],
      fields: [
        { key: 'name' },
        {
          key: 'type.display',
          label: 'Type'
        },
        { key: 'description' },
        { key: 'notes' },
        { key: 'actions' }
      ]
    }
  },
  async mounted() {
    await this.fetchSpellLists()
    this.allSpellLists = this.spellLists
  },
  methods: {
    async fetchSpellLists() {
      this.spellLists = await api.fetchSpellLists(this.$axios)
    },
    confirmDeleteSpellList({ id, name, type }) {
      this.confirm = {
        id,
        name,
        type
      }
      this.$refs['modal-confirm-delete'].show()
    },
    async ok(id) {
      try {
        await api.deleteSpellList(id, this.$axios)
        this.$bvModal.hide('modal-confirm-delete')
        await this.fetchSpellLists()
      } catch (err) {
        console.error(err)
        if (err.response.status === 403) {
          this.$bvModal.hide('modal-confirm-delete')
          this.confirm = {}
          this.validationErrors.push(err.data.message)
        }
      }
    },
    cancel() {
      this.$bvModal.hide('modal-confirm-delete')
      this.confirm = {}
    }
  }
}
</script>
