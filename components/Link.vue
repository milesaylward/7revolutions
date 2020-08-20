<template>
  <div>
    {{ to }}
  </div>
</template>

<script>
export default {
  name: 'Link',
  props: {
    to: {
      type: String,
      default: ''
    }
  },
}
</script>

<style lang="scss">

</style>
