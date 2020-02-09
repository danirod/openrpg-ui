<template>
  <div>
    <div>
      <nuxt-link to="/spells/">
        <b-button size="sm" class="mr-1">Lista de hechizos</b-button>
      </nuxt-link>
    </div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
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
        id="input-group-spell-list"
        label="Lista:"
        label-for="input-spell-list"
        description="La lista a la que pertenece el hechizo (TODO: Sustituir con un dropdown)"
      >
        <b-form-input
          id="input-spell-list"
          v-model="form.list_name"
          required
          placeholder="Nombre de la lista del hechizo"
        >
        </b-form-input>
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

      <b-button type="submit" variant="primary">Crear</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
import * as api from '../../api/spells'

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
  type: 'std',
  subclass: 'none',
  clazz: 'I',
  effect_area: 'SELF',
  duration: 'C',
  range: 'SELF'
}

export default {
  data() {
    return {
      show: true,
      initial: formInitial,
      form: { ...formInitial },
      config: {
        codes: {
          std: { code: 'std', display: 'Estandar' },
          ins: { code: 'ins', display: 'Instantaneo' },
          nopp: { code: 'nopp', display: 'No requiere PP' },
          comp: { code: 'comp', display: 'Compuesto' }
        },
        classes: {
          E: { code: 'E', display: 'Elemental' },
          EB: { code: 'EB', display: 'Elemental de bola' },
          ED: { code: 'ED', display: 'Elemental dirigido' },
          F: { code: 'F', display: 'Fuerza' },
          P: { code: 'P', display: 'Pasivo' },
          U: { code: 'U', display: 'Utilidad' },
          I: { code: 'I', display: 'Informacion' }
        },
        subclasses: {
          none: { code: 'none', display: '-- Ninguna --' },
          s: { code: 's', display: 'subconsciente' },
          m: { code: 'm', display: 'mental' }
        },
        effect_areas: {
          SELF: { code: 'SELF', display: 'A uno mismo' },
          AREA: {
            code: 'AREA',
            display: 'A un area determinada (1 hierba, 1 extremidad)'
          },
          TARGET: { code: 'SELF', display: 'A objetivo(s)' },
          TARGET_LVL: { code: 'SELF', display: 'A objetivo(s) / nivel' },
          DIST: { code: 'DIST', display: 'Distancia en metros (radio)' },
          DIST_LVL: {
            code: 'DIST_LVL',
            display: 'Distancia en metros/nivel (radio)'
          },
          VARY: {
            code: 'VARY',
            display: 'Varia en funcion de las circunstancias'
          },
          NONE: { code: 'NONE', display: 'Sin area de efecto' }
        },
        duration: {
          TIME: { code: 'TIME', display: 'Duration determinada' },
          C: { code: 'C', display: 'Se requiere concentracion' },
          DURATION: {
            code: 'DURATION',
            display: 'Se requiere concentracion, con limite de tiempo'
          },
          P: { code: 'P', display: 'Permanente e inmediato' },
          VARY: { code: 'VARY', display: 'Varia en funcion del hechizo' },
          INS: { code: 'INS', display: 'Sin duracion, inmediato' },
          TIME_LVL: {
            code: 'TIME_LVL',
            display: 'Tiempo/asaltos multiplicados por el nivel del lanzador'
          },
          TIME_FAIL: {
            code: 'TIME_FAIL',
            display: 'unidad de tiempo / puntos. tiempo = ((TR - RMF) / puntos)'
          }
        },
        range: {
          SELF: { code: 'SELF', display: 'A uno mismo' },
          CON: { code: 'CON', display: 'Se requiere contacto' },
          DIST: {
            code: 'DIST',
            display:
              'El lanzador no puede estar mas lejos de la distancia del area del efecto deseada'
          },
          DIST_LVL: {
            code: 'DIST_LVL',
            display:
              'La distancia del area de efecto no puede ser mayor de la distancia por el nivel del lanzador'
          },
          ILI: { code: 'ILI', display: 'Sin limitacion' },
          VARY: {
            code: 'VARY',
            display:
              'La distancia varia en funcion de algun aspecto del feitizo'
          }
        }
      }
    }
  },
  computed: {
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
  methods: {
    async onSubmit(evt) {
      evt.preventDefault()
      try {
        const payload = { ...this.form }
        await api.createSpell(payload, this.$axios)
      } catch (e) {
        console.error(e)
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
