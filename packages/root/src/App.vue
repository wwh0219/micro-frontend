<template>
  <app-view id="app" v-loading="pending">
    <template v-slot:header>
      <app-header>
        <template v-slot:right>
          <el-dropdown
            size="mini"
            :value="currentAppAlias"
            @command="$router.push({ name: 'root', params: { appAlias: $event } })"
          >
            <div style="color:#fff;margin-right:10px">{{currentAppAlias || '请选择'}}</div>
            <template v-slot:dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="i in appList" :key="i.id" :command="i.ALIAS">{{ i.ALIAS }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </app-header>
    </template>
    <Container v-if="vm" :vm="vm"></Container>
  </app-view>
</template>
<script>
import { uninstallSubApp } from 'shared'
import Container from './container'
import { loadScripts, loadStyles } from 'shared/utils/load-resource'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      app: 1,
      pending: false,
      vm: null
    }
  },
  components: {
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
    ...mapActions(['getManifest']),
    async loadResource () {
      this.pending = true
      await this.getManifest(this.currentApp)
      await Promise.all([
        loadScripts(this.currentApp.manifest.scripts || []),
        loadStyles(this.currentApp.manifest.styles || [])
      ])
      const vm = await window.SUB_SYS_FACTORY_MAP[this.currentApp.ID]()
      this.vm && uninstallSubApp(this.vm)
      this.vm = vm
      this.pending = false
    }
  },
  watch: {}
}
</script>
<style lang="scss"></style>
