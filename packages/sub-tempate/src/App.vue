<template>
  <div class="sub">
    <Header v-if="!isInternal"></Header>
    {{user}}
  </div>
</template>
<script>
import Header from 'shared/components/app-header'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('shared')
export default {
  name: 'app',
  data () {
    return {
      isInternal: window.IS_INTERNAL
    }
  },
  components: {
    Header
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapMutations(['SET_DATA'])
  },
  mounted () {
    this.SET_DATA(['a', 'b', 'c'])
  }
}
</script>
<style lang="scss">
</style>
