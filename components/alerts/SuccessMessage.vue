<template>
  <div @click="handleClick">
    <b-alert v-if="isSuccess" show variant="success">{{
      successMessage
    }}</b-alert>
  </div>
</template>

<script>
export default {
  props: ['success', 'successMessage'],
  data() {
    return {}
  },
  computed: {
    isSuccess() {
      return this.success
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style></style>
