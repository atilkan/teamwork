<template>
  <div class="input-alpha">
    <input type="text" :placeholder="placeholder" />
  </div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "input-alpha",
  props: {
    placeholder: {
      type: String,
      default: "Search",
      required: false,
    },
  },
})
</script>

<style lang="sass" scoped>
@import "./input-alpha.sass"
</style>
