<template>
  <div>
    <validation-errors
      v-if="validationErrors"
      :errors="validationErrors"
    ></validation-errors>
    <b-table
      id="user-table"
      ref="user_table"
      :items="users"
      :fields="fields"
      busy.sync="true"
    >
      <template v-slot:cell(actions)="row">
        <b-button
          :to="{ name: 'users-id', params: { id: row.item.id } }"
          size="sm"
          class="mr-1"
          >Ver</b-button
        >
        <b-button
          :to="{ name: 'users-id-edit', params: { id: row.item.id } }"
          size="sm"
          class="mr-1"
          >Editar</b-button
        >
        <b-button
          size="sm"
          class="mr-1"
          @click="confirmDeleteUser(row.item.id, row.item.email)"
          >Eliminar</b-button
        >
      </template>
    </b-table>
    <b-modal id="modal-confirm-delete" ref="modal-confirm-delete" hide-footer>
      <div class="d-block text-center">
        <p>¿Quieres borrar este usuario? {{ user_confirm.email }}</p>
        <b-button size="md" variant="success" @click="ok(user_confirm.id)"
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
        this.users = response.data.data
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
