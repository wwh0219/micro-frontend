<template>
  <div class="app-container" ref="container">

  </div>
</template>
<script>
export default {
  name: 'app-container',
  props: {
    vm: Object
  },
  mounted () {
    this.$watch('vm', {
      immediate: true,
      handler (vm) {
        if (vm) {
          console.log(vm)
          const div = document.createElement('div')
          vm.$mount(div)
          this.$refs.container.appendChild(vm.$el)
        }
      }
    })
  },
  watch: {

  }
}
</script>
