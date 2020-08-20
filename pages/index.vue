<template>
  <div class="page">
    <RichTextRenderer :document="page.fields.pageBlock" :node-renderers="renderNodes" />
  </div>
</template>

<script>
import richTextComponentMixin from '@/mixins/richTextComponents'
import { mapGetters } from 'vuex'
import { checkStoreContent } from '@/core/utils'

export default {
  mixins: [richTextComponentMixin],
  fetchOnServer: false,
  async fetch({ store, query }) {
    await checkStoreContent(store, query.draft)
  },
  computed: {
    ...mapGetters([
      'getContentForPage'
    ]),
    page() {
      return this.getContentForPage('home')
    }
  }
}
</script>

<style lang="scss">

</style>
