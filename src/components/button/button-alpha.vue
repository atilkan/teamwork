<template>
  <button @click="$emit('click')" class="button-alpha">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "button-alpha",
})
</script>

<style lang="sass" scoped src="./button-alpha.sass"></style>
