<template>
  <div>
    <validation-errors
      :errors="validationErrors"
      v-if="validationErrors"
    ></validation-errors>
    <b-table
      id="user-table"
      ref="user_table"
      :items="users"
      :fields="fields"
      busy.sync="true"
    >
      <template v-slot:cell(actions)="row">
        <router-link :to="{ name: 'users-id', params: { id: row.item.id } }">
          <b-button size="sm" class="mr-1">Ver</b-button>
        </router-link>
        <router-link
          :to="{ name: 'users-id-edit', params: { id: row.item.id } }"
        >
          <b-button size="sm" class="mr-1">Editar</b-button>
        </router-link>
        <b-button
          @click="confirmDeleteUser(row.item.id, row.item.email)"
          size="sm"
          class="mr-1"
          >Eliminar</b-button
        >
      </template>
    </b-table>
    <b-modal id="modal-confirm-delete" ref="modal-confirm-delete" hide-footer>
      <div class="d-block text-center">
        <p>¿Quieres borrar este usuario? {{ user_confirm.email }}</p>
        <b-button @click="ok(user_confirm.id)" size="md" variant="success"
          >OK</b-button
        >
        <b-button @click="cancel()" size="md" variant="danger">Cancel</b-button>
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
        { key: 'email' },
        { key: 'created_at' },
        { key: 'actions' }
      ],
      users: [],
      validationErrors: [],
      isBusy: false,
      user_confirm: {}
    }
  },
  mounted() {
    this.getResults()
  },
  methods: {
    // Our method to GET results from a Laravel endpoint
    getResults(ctx, callback) {
      this.$axios.get('/api/users').then((response) => {
        this.users = response.data
        this.totalRows = response.data.length
        return this.users
      })
    },
    confirmDeleteUser(id, email) {
      this.user_confirm = {
        id,
        email
      }
      this.$refs['modal-confirm-delete'].show()
    },
    ok(id) {
      this.$axios
        .delete(`api/users/${id}`)
        .then((response) => {
          this.$bvModal.hide('modal-confirm-delete')
          this.user_confirm = {}
          this.users = this.users.filter((user) => user.id !== id)
        })
        .catch((err) => {
          if (err.response.status === 403) {
            this.$bvModal.hide('modal-confirm-delete')
            this.user_confirm = {}
            this.validationErrors.push(err.response.data.message)
          }
        })
    },
    cancel() {
      this.$bvModal.hide('modal-confirm-delete')
      this.user_confirm = {}
    }
  }
}
</script>
