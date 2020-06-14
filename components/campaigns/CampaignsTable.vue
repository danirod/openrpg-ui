<template>
  <div class="overflow-auto">
    <b-table
      id="table"
      striped
      hover
      :per-page="perPage"
      :current-page="currentPage"
      :items="provider"
      :fields="fields"
    >
      <template v-slot:cell(actions)="row">
        <b-button :to="`/campaigns/${row.item.id}/`">Detalles</b-button>
        <b-button :to="`/campaigns/${row.item.id}/edit`">Editar</b-button>
        <b-button variant="danger" @click.capture="onDestroyRequest(row.item)"
          >Borrar</b-button
        >
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      aria-controls="table"
    />
    <b-modal
      id="destroy-modal"
      ok-title="Borrar"
      cancel-title="Cancelar"
      ok-variant="danger"
      @ok="onDestroyConfirmed"
    >
      <p v-if="destroy">
        <strong>¡Vas a borrar la campaña {{ destroy.title }}!</strong>
      </p>
      <p>
        Este es un proceso irreversible que no tiene vuelta atrás. ¿Le damos de
        verdad?
      </p>
    </b-modal>
  </div>
</template>

<script>
import { fetchCampaigns, destroyCampaign } from '~/api/campaigns'

export default {
  name: 'CampaignsTable',
  data() {
    return {
      perPage: 15,
      currentPage: 1,
      totalRows: 0,
      destroy: null
    }
  },
  computed: {
    fields() {
      return [
        {
          key: 'title',
          label: 'Título'
        },
        {
          key: 'actions',
          label: 'Acciones'
        }
      ]
    }
  },
  methods: {
    async provider(ctx) {
      this.isBusy = true
      try {
        const request = await fetchCampaigns(this.$axios, ctx.currentPage)
        this.totalRows = request.meta.total
        this.perPage = request.meta.per_page
        this.currentPage = request.meta.current_page
        this.isBusy = false
        return request.data
      } catch (e) {
        this.isBusy = false
        return []
      }
    },
    onDestroyRequest(campaign) {
      this.destroy = campaign
      this.$bvModal.show('destroy-modal')
    },
    async onDestroyConfirmed() {
      await destroyCampaign(this.$axios, this.destroy.id)
      this.destroy = null
      this.$root.$emit('bv::refresh::table', 'table')
    }
  }
}
</script>
