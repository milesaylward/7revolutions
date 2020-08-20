<template>
  <div class="podcast-detail page">
    <div class="podcast-detail__hero content">
      <div class="podcast-detail__hero__copy">
        <h1>{{ content.title }}</h1>
        <p>{{ date }}</p>
      </div>
      <img :src="image.url" :alt="image.title">
    </div>
    <div>
      <hr>
      <div class="podcast-detail__listen content">
        <h2>Listen:</h2>
        <ul class="podcast-detail__listen__links list">
          <li v-for="link in content.podcastLinks" :key="link.sys.id" class="podcast-detail__listen__links__link">
            <a :href="link.fields.link" target="_blank">{{ link.fields.copy }}</a>
          </li>
        </ul>
      </div>
      <hr>
    </div>
    <h2>Overview</h2>
    <div class="content">
      <div class="content--split content__left">
        <RichTextRenderer :document="content.body" :node-renderers="renderNodes" />
      </div>
      <Author :author="content.author" class="content__right" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import richTextComponentMixin from '@/mixins/richTextComponents'
import { getPodcastItems, checkStoreContent } from '@/core/utils'
import Author from '@/components/Author'

export default {
  name: 'PodcastDetail',
  components: {
    Author
  },
  mixins: [richTextComponentMixin],
  async validate({ params, store, query }) {
    await checkStoreContent(store, query.draft)
    await getPodcastItems(store, query.draft)
    return !!store.state.podcasts.filter(podcast => podcast.fields.slug === params.id)[0]
  },
  computed: {
    ...mapState(['podcasts']),
    content() {
      const page = this.podcasts.filter(podcast => podcast.fields.slug === this.$route.params.id)[0]
      return page.fields
    },
    image() {
      const { file, title } = this.content.heroImage.fields
      return {
        url: `https:${file.url}`,
        title
      }
    },
    date() {
      return moment(this.content.publishDate).format('MMMM Do YYYY')
    }
  }
}
</script>

<style lang="scss">
.podcast-detail {
  &__hero {
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__copy {
      h1, p {
        padding: 0;
      }
    }
  }
  .content {
    display: flex;
    margin: 50px auto;
    &__left {
      width: 70%;
      margin-right: 80px;
      p {
        margin-bottom: 40px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    &__right {
      width: 30%;
    }
  }
  &__listen {
    display: flex;
    align-items: center;
    h2 {
      width: auto;
      margin: 0;
      padding: 0;
    }
    &__links {
      display: flex;
      list-style: none;
      &.list {
        padding: 0;
        margin-left: 20px;
      }
      &__link {
        margin: 0 10px;
        &:first-child {
          margin-left: 0;
        }
        a {
          font-family: 'Open Sans';
          font-weight: bold;
          padding: 10px 20px;
          border: 1px solid black;
          color: black;
          border-radius: 4px;
          transition: background 250ms $easeOutMaterial, color 250ms $easeOutMaterial;
          &:not(.md-button) {
            &:hover {
              text-decoration: none;
              background: black;
              color: white;
            }
          }
          &::after {
            display: none;
          }
        }
      }
    }
  }
}
</style>
