import Vue from 'vue'

const DropdownHOC = (component, fetchData) => {
  return Vue.component('DropdownHOC', {
    data() {
      return {
        options: [],
        selected: null,
      }
    },
    created() {
      console.log('created', arguments)
    },
    mounted() {
      console.log('mounted', arguments)
      // this.options = await fetchData(this.$axios)
    },
    methods: {
      handleChange(id) {
        this.$emit('change', id)
      }
    },
    render(createElement, context) {
      return createElement(component, {
        props: {
          onChange: this.handleChange,
          options: this.options,
          selected: this.selected
        }
      })
    }
  })
}

export default DropdownHOC
