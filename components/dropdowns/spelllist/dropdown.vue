<template>
  <b-form-select
    v-model="selected"
    :options="options"
    class="mb-3"
    @change="onChange(selected)"
  >
    <!-- This slot appears above the options from 'options' prop -->
    <template v-slot:first>
      <b-form-select-option :value="null">
        -- Please select an option --
      </b-form-select-option>
    </template>
  </b-form-select>
</template>

<script>
export default {
  props: ['options', 'selected', 'onChange']
}
</script>

<style></style>
