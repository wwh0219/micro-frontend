<template>
  <div class="app-header">
    <div class="app-header__left">
      <img
        @click="$emit('icon-click',$event)"
        class="app-header__icon"
        :src="require('common/assets/logo.png')"
        alt
      />
      <slot name="left"></slot>
    </div>
    <slot></slot>
    <div class="app-header__right">
      <slot name="right"></slot>
      <!-- <el-dropdown v-if="user">
        <span class="el-dropdown-link">
          {{user.id}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('common')
export default {
  name: 'app-header',
  computed: {
    ...mapGetters(['user'])
  }
}
</script>
