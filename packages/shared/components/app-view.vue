<template>
  <div class="app-view">
    <div class="app-view__header">
      <slot name="header"></slot>
    </div>
    <div class="app-view__main">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-view'
}
</script>

<style lang="scss">
.app-view{
  height: 100%;
  @include flex-col;
  .app-view__main{
    flex:1
  }
}
</style>
