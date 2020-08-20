<template>
  <div class="parralax-image">
    <span class="image-container" :style="backgroundStyle">
      <div v-if="fields.addOverlay" class="image-container__overlay" />
    </span>
    <div v-if="hasContent" class="content">
      <div class="parralax-image__copy" :class="{ right: fields.rightAligned }">
        <RichTextRenderer :document="content" :node-renderers="renderNodes" />
      </div>
    </div>
  </div>
</template>

<script>
import richTextComponentMixin from '../mixins/richTextComponents'

export default {
  name: 'ParralaxImage',
  mixins: [richTextComponentMixin],
  props: {
    heroContent: {
      type: Object,
      default: () => ({})
    },
    fields: {
      type: Object,
      default: () => ({})
    },
    image: {
      type: Object,
      required: true
    }
  },
  computed: {
    imgeUrl() {
      return `https:${this.image.fields.file.url}`
    },
    backgroundStyle() {
      return {
        backgroundImage: `url(${this.imgeUrl})`
      }
    },
    hasContent() {
      return Object.keys(this.content).length
    },
    content() {
      return this.heroContent
    }
  }
}
</script>

<style lang="scss">
.parralax-image {
  position: relative;
  overflow: hidden;
  max-height: 600px;
  overflow: hidden;
  display: flex;
  align-items: center;
  &:last-child {
    margin-bottom: 0;
  }
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &__copy {
    width: 50%;
    color: $offWhite;
    &.right {
      text-align: right;
      margin-left: auto;
    }
    h1 {
      margin: 0;
      padding: 0;
    }
    p, a {
      color: $offWhite !important;
      padding: 0;
      &:after {
        background-color: $offWhite;
      }
      &:hover {
        text-decoration: none;
      }
    }
    a:not(.md-button):hover {
      text-decoration: none;
    }

    p {
      margin: 20px 0;
    }
  }
  .image-container {
    position: relative;
    width: 100%;
    padding-top: 50%;
    background-attachment: fixed;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    &__overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.35);
    }
    img {
      position: absolute;
      display: block;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      object-fit: cover;
      z-index: -1;
    }
  }
}
</style>
