<template>
  <div>
    <Navigation />
    <Nuxt />
    <FormModal :show-modal="showModal" />
    <Footer />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FormModal from '@/components/FormModal'

export default {
  components: {
    Navigation,
    Footer,
    FormModal
  },
  computed: {
    ...mapState(['showModal'])
  }
}
</script>

<style lang="scss">
@import '../assets/styles/scaffold.scss';
</style>
