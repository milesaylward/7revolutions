<template>
  <div class="card" @click="handleCardClick">
    <div class="background" :style="{ backgroundImage: `url(${url})` }" />
    <div class="overlay">
      <h3>
        {{ card.fields.title }}
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardBlock',
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  computed: {
    url() {
      const { url } = this.card.fields.image.fields.file
      return `https:${url}`
    }
  },
  methods: {
    handleCardClick() {
      const { navSlug } = this.card.fields.page.fields
      this.$router.push({ path: navSlug })
    }
  }
}
</script>

<style lang="scss">
.card {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  .background {
    width: 100%;
    padding-top: 100%;
    background-size: cover;
    transition: transform 350ms $easeOutMaterial;
  }
  flex-basis: 100%;
  margin: 0 10px;
  .overlay {
    opacity: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba(0,0,0,0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 350ms $easeOutMaterial;
    h3 {
      font-size: 26px;
      margin-top: 0;
      color: white;
      text-align: center;
    }
  }
  &:hover {
    .background {
      transform: scale(1.2);
    }
    .overlay {
      opacity: 1;
    }
  }
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
}
</style>
