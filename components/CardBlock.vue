<template>
  <div class="card-block content">
    <Card
      v-for="(card, i) in content.cards"
      :key="i"
      :card="card"
    />
  </div>
</template>

<script>
import Card from './Card'

export default {
  name: 'CardBlock',
  components: {
    Card
  },
  props: {
    content: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.card-block {
  display: flex;
  justify-content: space-between;
  margin: 50px auto;
  width: 100%;
}
</style>
