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
  async validate({ params, store, query }) {
    await checkStoreContent(store, query.draft)
    const slug = params.slug.replace('-', ' ')
    return !!store.getters.getContentForPage(slug)
  },
  computed: {
    page() {
      const slug = this.$route.params.slug.replace('-', ' ')
      return this.getContentForPage(slug)
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
