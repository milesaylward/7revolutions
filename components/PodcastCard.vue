<template>
  <nuxt-link class="podcast-card" :to="link">
    <div class="podcast-card__hero">
      <img :src="image.url" :alt="image.title">
      <span class="podcast-card__hero__overlay">
        <p class="blurb">
          {{ content.blurb }}
        </p>
      </span>
    </div>
    <div class="podcast-card__copy">
      <h3>{{ content.title }}</h3>
      <p>{{ date }}</p>
    </div>
  </nuxt-link>
</template>

<script>
import moment from 'moment'

export default {
  name: 'PodcastCard',
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  computed: {
    image() {
      const { file, title } = this.content.heroImage.fields
      return {
        url: `https:${file.url}`,
        title
      }
    },
    link() {
      return `/podcast/${this.content.slug}`
    },
    date() {
      return moment(this.content.publishDate).format('MMMM Do YYYY')
    }
  }
}
</script>

<style lang="scss">
.podcast-card {
  width: 30%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  &:after {
    display: none;
  }
  &__hero {
    position: relative;
    height: 70%;
    overflow: hidden;
    img:not(.md-image) {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 350ms $easeOutMaterial;
    }
    &__overlay {
      position: absolute;
      background: rgba(0,0,0,0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      opacity: 0;
      transition: opacity 350ms $easeOutMaterial;
      p {
        color: $offWhite;
        margin: 0;
        padding: 0 20px;
        text-align: center;
      }
    }
  }
  &__copy {
    h3 {
      margin: 10px 0 0;
      padding: 0;
    }
    p {
      padding: 0;
    }
  }
  &:hover {
    &:not(.md-button):hover {
      color: $darkGrey;
      text-decoration: none;
    }
    .podcast-card {
      &__hero {
        img {
          transform: scale(1.1);
        }
        &__overlay {
          opacity: 1;
        }
      }
    }

  }
}
</style>
