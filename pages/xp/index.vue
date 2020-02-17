<template>
  <div ref="top">
    <validation-errors
      v-if="validationErrors"
      :errors="validationErrors"
    ></validation-errors>
    <success-message
      :success="success"
      :success_message="success_message"
      @click="toggleSuccess"
    ></success-message>
    <div class="panel-body">
      <div class="container-fluid">
        <form ref="XPForm" @submit="submitForm">
          <div class="row my-1">
            <b-form-group
              label="Personaje:"
              label-for="character"
              description="Personaje al que se le suman los puntos de experiencia"
            >
              <b-form-select
                id="character"
                v-model="selected.character"
                :options="options"
                required
                @change="fillFormWithCharLevel()"
              ></b-form-select>
            </b-form-group>
          </div>

          <div class="row my-1">
            <b-form-group
              label="Maniobra"
              label-for="maneuver"
              description="Dificultad de la maniobra"
            >
              <b-form inline>
                <b-form-select
                  id="maneuver"
                  v-model="selected.maneuver"
                  :options="maneuver_options"
                  @change="
                    calculateXP(
                      `maneuver?man=${selected.maneuver}`,
                      'totalManeuver'
                    )
                  "
                >
                </b-form-select>
                <b-input-group prepend="Total">
                  <b-form-input
                    ref="totalManeuver"
                    v-model="selected.xp.totalManeuver"
                    type="number"
                    @change="recalculateXP()"
                  ></b-form-input>
                </b-input-group>
              </b-form>
            </b-form-group>
          </div>

          <div class="row my-1">
            <b-form-group
              label="Hechizos"
              description="Puntos por lanzar hechizos"
            >
              <b-form inline>
                <b-input-group prepend="Nivel hechicero / nivel hechizo">
                  <b-form-input
                    ref="casterLevel"
                    v-model="selected.casterLevel"
                    type="number"
                    min="1"
                    @change="
                      calculateXP(
                        `spell?caster=${selected.casterLevel}&spell=${selected.spellLevel}`,
                        'totalSpell'
                      )
                    "
                  ></b-form-input>
                  <b-form-input
                    ref="spellLevel"
                    v-model="selected.spellLevel"
                    type="number"
                    min="0"
                    @change="
                      calculateXP(
                        `spell?caster=${selected.casterLevel}&spell=${selected.spellLevel}`,
                        'totalSpell'
                      )
                    "
                  ></b-form-input>
                </b-input-group>
                <b-input-group prepend="Total">
                  <b-form-input
                    ref="totalSpell"
                    v-model="selected.xp.totalSpell"
                    type="number"
                    @change="recalculateXP()"
                  ></b-form-input>
                </b-input-group>
              </b-form>
            </b-form-group>
          </div>

          <div class="row my-1">
            <b-form-group
              label="Críticos"
              description="Por infligir crítico a un adversario"
            >
              <b-form inline>
                <b-input-group prepend="Nivel del blanco / nivel del crítico">
                  <b-form-input
                    ref="criticalTargetLevel"
                    v-model="selected.criticalTargetLevel"
                    type="number"
                    min="1"
                    @change="
                      calculateXP(
                        `critical?crit=${selected.critical}&level=${selected.criticalTargetLevel}`,
                        'totalCritical'
                      )
                    "
                  ></b-form-input>
                  <b-form-select
                    ref="critical"
                    v-model="selected.critical"
                    :options="critical_options"
                    @change="
                      calculateXP(
                        `critical?crit=${selected.critical}&level=${selected.criticalTargetLevel}`,
                        'totalCritical'
                      )
                    "
                  ></b-form-select>
                </b-input-group>
                <b-input-group prepend="Total">
                  <b-form-input
                    ref="totalCritical"
                    v-model="selected.xp.totalCritical"
                    type="number"
                    @change="recalculateXP()"
                  >
                  </b-form-input>
                </b-input-group>
              </b-form>
            </b-form-group>
          </div>

          <div class="row my-1">
            <b-form-group
              label="Pieza"
              description="Por 'vencer' a un adversario"
            >
              <b-form inline>
                <b-input-group
                  prepend="Nivel del atacante / nivel del defensor"
                >
                  <b-form-input
                    ref="attackerLevel"
                    v-model="selected.attackerLevel"
                    type="number"
                    min="0"
                    @change="
                      calculateXP(
                        `kill?attack=${selected.attackerLevel}&def=${selected.defenderLevel}`,
                        'totalKill'
                      )
                    "
                  ></b-form-input>
                  <b-form-input
                    ref="defenderLevel"
                    v-model="selected.defenderLevel"
                    type="number"
                    min="1"
                    @change="
                      calculateXP(
                        `kill?attack=${selected.attackerLevel}&def=${selected.defenderLevel}`,
                        'totalKill'
                      )
                    "
                  ></b-form-input>
                </b-input-group>
                <b-input-group prepend="Total">
                  <b-form-input
                    ref="totalKill"
                    v-model="selected.xp.totalKill"
                    type="number"
                    @change="recalculateXP()"
                  >
                  </b-form-input>
                </b-input-group>
              </b-form>
            </b-form-group>
          </div>

          <div class="row my-1">
            <b-form-group
              label="Bonus pieza"
              description="Bonus por 'vencer' a un adversario (Manual monstruos y criaturas)"
            >
              <b-form inline>
                <b-input-group prepend="Nivel del atacante / código bonus">
                  <b-form-input
                    ref="attackerLevelBonus"
                    v-model="selected.attackerLevelBonus"
                    type="number"
                    min="1"
                    @change="
                      calculateXP(
                        `bonus?level=${selected.attackerLevelBonus}&code=${selected.bonusExp}`,
                        'totalBonus'
                      )
                    "
                  ></b-form-input>
                  <b-form-select
                    ref="bonus"
                    v-model="selected.bonusExp"
                    :options="bonus_options"
                    @change="
                      calculateXP(
                        `bonus?level=${selected.attackerLevelBonus}&code=${selected.bonusExp}`,
                        'totalBonus'
                      )
                    "
                  ></b-form-select>
                </b-input-group>
                <b-input-group prepend="Total">
                  <b-form-input
                    ref="totalBonus"
                    v-model="selected.xp.totalBonus"
                    type="number"
                    @change="recalculateXP()"
                  ></b-form-input>
                </b-input-group>
              </b-form>
            </b-form-group>
          </div>

          <div class="row my-1">
            <b-form-group
              label="Puntos de vida, poder y viaje"
              description="Por PV infligidos o sufridos, por PP gastados y por km de viaje"
            >
              <b-form inline>
                <b-input-group prepend="Total">
                  <b-form-input
                    v-model="selected.xp.totalTravel"
                    type="number"
                    @change="recalculateXP()"
                  >
                  </b-form-input>
                </b-input-group>
              </b-form>
            </b-form-group>
          </div>

          <div class="row my-1">
            <b-form-group
              label="Puntos por ideas/aventura"
              description="Por ideas u objetivos cumplidos en la aventura"
            >
              <b-form inline>
                <b-input-group prepend="Total">
                  <b-form-input
                    ref="totalIdea"
                    v-model="selected.xp.totalIdea"
                    type="number"
                    @change="recalculateXP()"
                  >
                  </b-form-input>
                </b-input-group>
              </b-form>
            </b-form-group>
          </div>

          <div class="row my-1">
            <b-form-group label="Suma total" class="totalXP-label">
              <b-form inline>
                <b-input-group prepend="Total">
                  <b-form-input
                    ref="totalXP"
                    v-model="selected.totalXP"
                    type="number"
                    class="totalXP"
                  ></b-form-input>
                </b-input-group>
              </b-form>
            </b-form-group>
          </div>

          <div class="row my-1">
            <b-button type="submit">Sumar</b-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      experiencesModel: {},
      selected: {
        critical: 'null',
        criticalTargetLevel: 1,
        character: null,
        casterLevel: 1,
        spellLevel: 0,
        attackerLevel: 0,
        defenderLevel: 0,
        bonusExp: 'null',
        attackerLevelBonus: 0,
        maneuver: 'ru',
        travel: 0,
        xp: {
          totalManeuver: 0,
          totalSpell: 0,
          totalCritical: 0,
          totalKill: 0,
          totalBonus: 0,
          totalTravel: 0,
          totalIdea: 0
        },
        totalXP: 0
      },
      success_message: '',
      submit_url: `api/characters/`,
      errors: [],
      success: false,
      validationErrors: '',
      options: [],
      maneuver_options: {
        ru: 'Rutina',
        mf: 'Muy facil',
        f: 'Facil',
        n: 'Normal',
        d: 'Dificil',
        md: 'Muy difícil',
        ed: 'Extremadamente difícil',
        lc: 'Locura completa',
        ab: 'Absurdo'
      },
      critical_options: {
        null: '--',
        a: 'A',
        b: 'B',
        c: 'C',
        d: 'D',
        e: 'E'
      },
      bonus_options: {
        null: '--',
        a: 'A',
        b: 'B',
        c: 'C',
        d: 'D',
        e: 'E',
        f: 'F',
        g: 'G',
        h: 'H',
        i: 'I',
        j: 'J',
        k: 'K',
        l: 'L'
      }
    }
  },
  mounted() {
    this.fillFormWithSelectChars()
  },
  methods: {
    submitForm(e) {
      e.preventDefault()
      this.$axios
        .patch(this.submit_url + this.selected.character, this.sumXp())
        .then((res) => {
          if (res.status === 200) {
            Object.assign(this.$data, this.$options.data.call(this))
            window.scrollTo(0, this.$refs.top.offsetTop)
            this.validationErrors = ''
            this.success = true
            this.success_message = res.data.message
            this.fillFormWithSelectChars()
          }
        })
        .catch((err) => {
          if (err.response.status === 422) {
            this.validationErrors = err.response.data.errors
          }
        })
    },
    calculateXP(endpoint, ref) {
      this.$axios
        .get(`api/xp/${endpoint}`)
        .then((res) => {
          this.selected.xp[ref] = res.data.message
          this.recalculateXP()
        })
        .catch((err) => {
          this.selected.xp[ref] = 0
          this.recalculateXP()
        })
    },
    sumXp() {
      const selectedCharacterCurrentXP = this.experiencesModel.get(
        this.selected.character
      )
      return {
        experience:
          parseInt(selectedCharacterCurrentXP.experience) +
          parseInt(this.selected.totalXP)
      }
    },
    recalculateXP() {
      let sumXPFields = 0

      Object.values(this.selected.xp).forEach(
        (xp) => (sumXPFields += parseInt(xp))
      )
      this.selected.totalXP = sumXPFields
    },
    fillFormWithCharLevel() {
      const selectedCharacter = this.experiencesModel.get(
        this.selected.character
      )
      const fields = ['casterLevel', 'attackerLevel', 'attackerLevelBonus']

      for (let i = 0; i < fields.length; i++) {
        this.selected[fields[i]] = selectedCharacter.level
      }
    },
    fillFormWithSelectChars() {
      this.$axios
        .get(`/api/characters/`)
        .then((res) => {
          const characters = res.data
          this.experiencesModel = new Map(
            characters.map((c) => [
              c.id,
              {
                experience: c.experience,
                level: c.level
              }
            ])
          )
          this.options = characters.map((c) => ({
            value: c.id,
            text: `${c.name} - ${c.experience} (Niv: ${c.level})`
          }))
        })
        .catch((err) => {
          this.errors.push(err)
        })
    },
    toggleSuccess() {
      this.success = !this.success
    }
  }
}
</script>
<style>
.totalXP {
  font-weight: bold;
}

.totalXP-label {
  font-weight: bold;
  color: #2fa360;
}
</style>
