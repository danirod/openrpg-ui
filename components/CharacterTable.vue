<template>
  <div>
    <validation-errors
      v-if="validationErrors"
      :errors="validationErrors"
    ></validation-errors>
    <b-table
      id="character-table"
      ref="character_table"
      :items="characters"
      :fields="fields"
      busy.sync="true"
    >
      <template slot="cell(actions)" slot-scope="row">
        <router-link
          :to="{ name: 'characters-id', params: { id: row.item.id } }"
        >
          <b-button size="sm" class="mr-1">Ver</b-button>
        </router-link>
        <router-link
          :to="{ name: 'characters-id-edit', params: { id: row.item.id } }"
        >
          <b-button size="sm" class="mr-1">Editar</b-button>
        </router-link>
        <b-button
          size="sm"
          class="mr-1"
          @click="confirmDeleteCharacter(row.item.id)"
          >Eliminar</b-button
        >
      </template>
    </b-table>
    <b-modal id="modal-confirm-delete" ref="modal-confirm-delete" hide-footer>
      <div class="d-block text-center">
        <p>¿Quieres borrar este personaje?</p>
        <b-button size="md" variant="success" @click="ok(character_confirm.id)"
          >OK</b-button
        >
        <b-button size="md" variant="danger" @click="cancel()">Cancel</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import ValidationErrors from '~/components/alerts/ValidationErrors'

export default {
  components: { ValidationErrors },
  data() {
    return {
      fields: [
        { key: 'name' },
        { key: 'level' },
        { key: 'experience' },
        { key: 'actions' }
      ],
      characters: [],
      validationErrors: [],
      isBusy: false,
      character_confirm: {}
    }
  },
  mounted() {
    this.getResults()
  },
  methods: {
    getResults(ctx, callback) {
      this.$axios.get('/api/characters').then((response) => {
        this.characters = response.data.data
        return this.characters
      })
    },
    confirmDeleteCharacter(id, email) {
      this.character_confirm = {
        id
      }
      this.$refs['modal-confirm-delete'].show()
    },
    ok(id) {
      this.$axios
        .delete(`api/characters/${id}`)
        .then((response) => {
          this.$bvModal.hide('modal-confirm-delete')
          this.character_confirm = {}
          this.characters = this.characters.filter(
            (character) => character.id !== id
          )
        })
        .catch((err) => {
          if (err.response.status === 403) {
            this.$bvModal.hide('modal-confirm-delete')
            this.character_confirm = {}
            this.validationErrors.push(err.response.data.message)
          }
        })
    },
    cancel() {
      this.$bvModal.hide('modal-confirm-delete')
      this.character_confirm = {}
    }
  }
}
</script>
