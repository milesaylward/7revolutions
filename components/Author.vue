<template>
  <div class="author">
    <img :src="imageUrl" :alt="author.fields.name">
    <h3>{{ author.fields.name }}</h3>
    <p>{{ author.fields.description }}</p>
  </div>
</template>

<script>
export default {
  name: 'Author',
  props: {
    author: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageUrl() {
      const { url } = this.author.fields.image.fields.file
      return `http:${url}`
    }
  }
}
</script>

<style lang="scss">
.author {
  img {
    width: 100%;
  }
  h3, p {
    padding: 0;
    margin: 0;
  }
  h3 {
    margin: 10px 0;
  }
  p {
    font-size: 14px;
    line-height: 18px;
  }
}
</style>
