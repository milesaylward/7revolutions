import { INLINES, BLOCKS } from '@contentful/rich-text-types'
import RichTextRenderer from 'contentful-rich-text-vue-renderer'

export default {
  components: {
    RichTextRenderer
  },
  computed: {
    componentName() {

    },
    renderNodes() {
      return {
        [INLINES.HYPERLINK]: this.customLinkEntry,
        [BLOCKS.EMBEDDED_ENTRY]: this.getRenderForBlock,
        [INLINES.EMBEDDED_ENTRY]: this.getRenderForBlock
      }
    }
  },
  methods: {
    customLinkEntry(node, key, h) {
      return h('nuxt-link', { key, props: { to: node.data.uri } }, node.content[0].value)
    },
    getRenderForBlock(node, key, h) {
      const { id } = node.data.target.sys.contentType.sys
      const { fields } = node.data.target
      switch (id) {
        case 'parallaxBlock':
          return h('parralax-image', { key, props: { heroContent: fields.content, image: fields.image, fields } })
        case 'cardBlock':
          return h('card-block', { key, props: { content: fields } })
        case 'podcastblock':
          return h('podcast-block', { key, props: { content: fields } })
        case 'modalButton':
          return h('modal-button', { key, props: { content: fields } })
        default:
          return h('h1', { key }, `No Component for ${id}`)
      }
    }
  }
}
