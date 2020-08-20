<template>
  <div class="modal-button content">
    <button @click="handleShow">
      {{ content.buttonText }}
    </button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'ModalButton',
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleShow() {
      this.setShowModal(true)
    },
    ...mapMutations(['setShowModal'])
  }
}
</script>

<style lang="scss">
.modal-button {
  button {
    text-transform: uppercase;
    font-size: 16px;
    font-family: 'Open Sans';
    font-weight: bold;
    padding: 10px 20px;
    border: 1px solid black;
    color: black;
    border-radius: 4px;
    transition: background 250ms $easeOutMaterial, color 250ms $easeOutMaterial;
    &:hover {
      background: black;
      color: white;
    }
  }
}
</style>
