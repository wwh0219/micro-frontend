<template>
  <div id="app" v-loading="pending">
    <Header>
      <o-popover-select
        slot="right"
        :value="currentAppAlias"
        @input="$router.push({ name: 'root', params: { appAlias: $event } })"
      >
        <o-popover-option
          v-for="i in appList"
          :key="i.id"
          :value="i.ALIAS"
        >{{ i.ALIAS }}</o-popover-option>
      </o-popover-select>
    </Header>
    <Container v-if="vm" :vm="vm"></Container>
  </div>
</template>
<script>
import Header from 'common/components/app-header'
import Container from './views/container'
import appList from '../dev-subsysmt-map.json'
import { loadScripts, loadStyles } from 'common/utils/load-resource'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      app: 1,
      pending: false,
      vm: null
    }
  },
  components: {
    Header,
    Container
  },
  async created () {
    await this.$store.dispatch('getAppList')
    await this.$watch('currentAppAlias', {
      immediate: true,
      handler (val) {
        if (val) {
          this.loadResource()
        }
      }
    })
  },
  computed: {
    ...mapGetters(['getAppData', 'appList']),
    currentAppAlias () {
      return this.$route.params.appAlias || ''
    },
    currentApp () {
      return this.getAppData(this.currentAppAlias)
    }
  },
  methods: {
    async loadResource () {
      this.pending = true
      await Promise.all([
        loadScripts(this.currentApp.scripts || []),
        loadStyles(this.currentApp.styles || [])
      ])
      const vm = await window.SUB_SYS_FACTORY_MAP[this.currentApp.ID]()
      if (this.vm) {
        this.vm.$el.remove()
        this.vm.$destroy()
      }
      this.vm = vm
      this.pending = false
    }
  },
  watch: {}
}
</script>
<style lang="scss"></style>
