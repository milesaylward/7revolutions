<template>
  <div class="podcast-block">
    <h1>Recent Episodes</h1>
    <div class="content">
      <PodcastCard
        v-for="(podcast, i) in postcastsVisible"
        :key="`${podcast.sys.id}--${i}`"
        :content="podcast.fields"
      />
    </div>
    <div class="show-all-container">
      <a class="show-all" @click="showAll = !showAll;">
        {{ podcastCopy }}
      </a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getPodcastItems } from '@/core/utils'
import PodcastCard from './PodcastCard'

export default {
  name: 'PodcastBlock',
  components: {
    PodcastCard
  },
  async fetch() {
    await getPodcastItems(this.$store, this.$route.query.draft)
  },
  data: () => ({
    showAll: false,
    limit: 3
  }),
  computed: {
    postcastsVisible() {
      if (this.showAll) {
        return this.podcasts
      }
      return this.podcasts.slice(0, this.limit)
    },
    podcastCopy() {
      return this.showAll ? 'Show Less Podcasts' : 'Show All Podcasts'
    },
    ...mapState(['podcasts'])
  }
}
</script>

<style lang="scss">
.podcast-block {
  h1 {
    text-align: center;
  }
  .content {
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .show-all {
    cursor: pointer;
    display: inline-block;
    border: 1px solid black;
    padding: 10px;
    color: black;
    transition: background 250ms $easeOutMaterial, color 250ms $easeOutMaterial;
    &:hover {
      background: black;
      color: white;
    }
    &::after {
      display: none;
    }
    &-container {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 50px;
    }
  }
}
</style>
