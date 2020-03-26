<template>
  <div class="app-header">
    <div class="app-header__left">
      <img
        @click="$emit('icon-click',$event)"
        class="app-header__icon"
        :src="require('shared/assets/logo.png')"
        alt
      />
      <slot name="left"></slot>
    </div>
    <slot></slot>
    <div class="app-header__right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('shared')
export default {
  name: 'app-header',
  computed: {
    ...mapGetters(['user'])
  }
}
</script>
