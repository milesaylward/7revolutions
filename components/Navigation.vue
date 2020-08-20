<template>
  <nav v-if="navigation" class="navigation">
    <div class="content">
      <img :src="logo" class="navigation__logo">
      <div class="navigation__links">
        <nuxt-link
          v-for="link in navigation.items"
          :key="link.fields.navTitle"
          :to="link.fields.navSlug ? `/${link.fields.navSlug}` : '/'"
          class="navigation__links__link link"
        >
          {{ link.fields.navTitle }}
        </nuxt-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Navigation',
  computed: {
    ...mapState(['navigation']),
    logo() {
      return `https:${this.navigation.logo.fields.file.url}`
    }
  },
  methods: {
    getLinkLocation(link) {
      return link.navTitle === 'Home' ? '/' : link.navTitle
    }
  }
}
</script>

<style lang="scss">
.navigation {
  padding: 10px 0;
  height: 81px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: $offWhite;
  z-index: 10;
  box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.15);
  .content {
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
  }
  &__logo {
    max-width: 250px;
  }
  &__links {
    &__link {
      margin: 0 20px;
      .md-theme-default &.link {
        color: $darkGrey;
        &:hover {
          color: $darkGrey;
          text-decoration: none;
        }
      }
      &.nuxt-link-exact-active {
        &:after {
          transform: scaleX(1);
        }
      }
    }
  }
}
</style>
