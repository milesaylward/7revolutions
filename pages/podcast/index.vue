<template>
  <div class="page">
    <RichTextRenderer :document="page.fields.pageBlock" :node-renderers="renderNodes" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import richTextComponentMixin from '@/mixins/richTextComponents'
import { checkStoreContent } from '@/core/utils'

export default {
  mixins: [richTextComponentMixin],
  fetchOnServer: false,
  async validate({ route, store, query }) {
    await checkStoreContent(store, query.draft)
    return !!store.getters.getContentForPage(route.name)
  },
  computed: {
    page() {
      return this.getContentForPage(this.$route.name)
    },
    ...mapGetters([
      'getContentForPage'
    ])
  },
  template: 'default'
}
</script>

<style lang="scss">

</style>
