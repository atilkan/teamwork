<template>
  <transition name="modal">
    <div class="modal-alpha" v-if="isVisible">
      <div class="modal-overlay" @click="closeModal"></div>
      <div class="modal-window">
        <button class="modal-close-button" @click="closeModal">
          <unicon name="times" width="24" height="24" />
        </button>
        <transition name="modal">
          <div v-if="loading" class="modal-loading">
            <loader-alpha />
          </div>
          <slot v-else></slot>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
// @ts-nocheck // TODO: report bug to vue or vetur
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
    loading: {
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
      this.$emit("close")
    },
  },
})
</script>

<style scoped lang="sass" src="./modal-alpha.sass"></style>
