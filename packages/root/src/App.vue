<template>
  <div id="app" v-loading="pending">
    <Header>
      <el-dropdown
        size="mini"
        slot="right"
        :value="currentAppAlias"
        @command="$router.push({ name: 'root', params: { appAlias: $event } })">
        <div style="color:#fff;margin-right:10px">
          {{currentAppAlias || '请选择'}}
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="i in appList" :key="i.id" :command="i.ALIAS">{{ i.ALIAS }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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
