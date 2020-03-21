<template>
  <div>
    <div>
      <nuxt-link to="/spells/">
        <b-button size="sm" class="mr-1">Lista de hechizos</b-button>
      </nuxt-link>
    </div>
    <validation-errors
      v-if="validationErrors"
      :errors="validationErrors"
    ></validation-errors>
    <success-message
      v-if="success"
      :success="success"
      :success-message="successMessage"
    ></success-message>
    <b-form v-if="show" @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-group-name"
        label="Nombre:"
        label-for="input-name"
        description="El nombre del hechizo (Campo en negrita en los libros)"
      >
        <b-form-input
          id="input-name"
          v-model="form.name"
          type="name"
          required
          placeholder="Nombre de hechizo"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-level"
        label="Nivel:"
        label-for="input-level"
        description="El nivel del hechizo (Campo en negrita que precede al nombre)"
      >
        <b-form-input
          id="input-level"
          v-model="form.level"
          type="number"
          min="1"
          step="1"
          required
          placeholder="Nivel del hechizo"
        >
        </b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-description"
        label="Descripcion:"
        label-for="input-desc"
        description="La descripcion del hechizo (Texto que sigue al nombre del hechizo)"
      >
        <b-form-textarea
          id="input-desc"
          v-model="form.description"
          required
          placeholder="Description del hechizo"
        >
        </b-form-textarea>
      </b-form-group>

      <b-form-group
        id="input-group-notes"
        label="Notas:"
        label-for="input-notes"
        description="Anotaciones del hechizo (Aclaraciones u/o asteriscos en los libros)"
      >
        <b-form-textarea
          id="input-notes"
          v-model="form.notes"
          placeholder="Anotaciones del hechizo"
        >
        </b-form-textarea>
      </b-form-group>

      <b-form-group
        id="input-group-list"
        label="Lista:"
        label-for="input-list"
        description="Lista de hechizo"
      >
        <b-form-select
          v-model="form.list_id"
          :options="options"
          class="mb-3"
          @change="onListChanged(form.list_id)"
        >
          <!-- This slot appears above the options from 'options' prop -->
          <template v-slot:first>
            <b-form-select-option :value="null" disabled
              >-- Please select an option --</b-form-select-option
            >
          </template>
        </b-form-select>
      </b-form-group>

      <b-form-group id="input-group-type" label="Tipo:" label-for="input-type">
        <b-form-select
          id="input-type"
          v-model="form.type"
          :options="types"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group
        id="input-group-class"
        label="Clase:"
        label-for="input-class"
      >
        <b-form-select
          id="input-class"
          v-model="form.clazz"
          :options="classes"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group
        id="input-group-subclass"
        label="Subclase:"
        label-for="input-subclass"
      >
        <b-form-select
          id="input-subclass"
          v-model="form.subclass"
          :options="subclasses"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group
        id="input-group-effect-areas"
        label="Areas de efecto:"
        label-for="input-effect-areas"
      >
        <b-form-select
          id="input-effect-areas"
          v-model="form.effect_area"
          :options="effect_areas"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group
        id="input-group-durations"
        label="Duracion:"
        label-for="input-duration"
      >
        <b-form-select
          id="input-duration"
          v-model="form.duration"
          :options="durations"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group
        id="input-group-ranges"
        label="Range:"
        label-for="input-range"
      >
        <b-form-select
          id="input-range"
          v-model="form.range"
          :options="ranges"
          required
        ></b-form-select>
      </b-form-group>

      <b-button type="submit" variant="primary">Actualizar</b-button>
      <b-button type="reset" variant="danger">Limpiar</b-button>
    </b-form>
  </div>
</template>

<script>
import * as api from '~/api/spells'
import * as spellListApi from '~/api/spell-lists'
import * as spellsConfig from '~/data/spells'
import SuccessMessage from '~/components/alerts/SuccessMessage'
import ValidationErrors from '~/components/alerts/ValidationErrors'

const toSelect = (config) =>
  Object.values(config).map((c) => ({
    text: c.display,
    value: c.code
  }))
const formInitial = {
  name: '',
  level: 1,
  description: '',
  notes: '',
  list_name: '',
  list_id: null,
  type: 'std',
  subclass: 'none',
  clazz: 'I',
  effect_area: 'SELF',
  duration: 'C',
  range: 'SELF'
}

export default {
  components: {
    ValidationErrors,
    SuccessMessage
  },
  data() {
    return {
      show: true,
      success: null,
      successMessage: '',
      validationErrors: null,
      initial: formInitial,
      form: { ...formInitial },
      config: { ...spellsConfig },
      lists: null,
      options: [],
      selectedOption: null
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    classes() {
      return toSelect(this.config.classes)
    },
    subclasses() {
      return toSelect(this.config.subclasses)
    },
    types() {
      return toSelect(this.config.codes)
    },
    effect_areas() {
      return toSelect(this.config.effect_areas)
    },
    durations() {
      return toSelect(this.config.duration)
    },
    ranges() {
      return toSelect(this.config.range)
    }
  },
  async mounted() {
    try {
      // const id = this.$route.params.id
      const spell = await api.retrieveSpell(this.id, this.$axios)
      this.validationErrors = null
      this.initial = spell
      this.form = spell
      this.initial = spell
      const lists = await spellListApi.fetchSpellLists(this.$axios)
      this.lists = new Map(
        lists.map((item) => {
          const { id, name } = item
          return [id, name]
        })
      )
      this.options = lists
        .map(spellListApi.SearchResultAdapter)
        .map((item) => ({ value: item.id, text: item.name }))
    } catch (e) {
      this.success = false
      this.successMessage = ''
      this.validationErrors = e.data
    }
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault()
      try {
        const payload = { ...this.form }
        await api.updateSpell(this.id, payload, this.$axios)
        this.success = true
        this.successMessage = 'Hechizo actualizado correctamente'
        this.validationErrors = null
      } catch (e) {
        this.success = false
        this.successMessage = ''
        this.validationErrors = e.data
      }
    },
    onListChanged(listId) {
      console.log('ochaned', arguments)
      if (listId === null) {
        this.form.list_name = ''
        this.form.list_id = null
      } else {
        this.form.list_name = this.lists.get(listId)
        this.form.list_id = listId
      }
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form = { ...formInitial }
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
