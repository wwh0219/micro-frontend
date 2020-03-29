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
    }
  },
  components: {
    Header
  },
  computed: {
    ...mapGetters(['user', 'isInternal'])
  },
  methods: {
  },
  mounted () {
  }
}
</script>
<style lang="scss">
</style>
