<template>
  <div class="sub">
     <Header v-if="!isInternal"></Header>
				SUB1
  </div>
</template>
<script>
import Header from 'common/components/app-header'
export default {
  data(){
				return {
      isInternal:window.IS_INTERNAL
				}
		},
  components: {
    Header
  }
}
</script>
<style lang="scss">
</style>
