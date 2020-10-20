<template>
  <transition name="fade">
    <div class="modal-alpha" v-if="isVisible">
      <div class="modal-overlay" @click="closeModal"></div>
      <div class="modal-window">
        <button class="modal-close-button" @click="closeModal">
          <unicon name="times" width="24" height="24" />
        </button>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "modal-alpha",
  model: {
    prop: "visible",
    event: "visible",
  },
  props: {
    visible: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    isVisible: {
      get() {
        return this.visible
      },
      set(newValue) {
        this.$emit("visible", newValue)
      },
    },
  },
  methods: {
    closeModal() {
      this.isVisible = false
    },
  },
})
</script>

<style scoped lang="sass" src="./modal-alpha.sass"></style>
