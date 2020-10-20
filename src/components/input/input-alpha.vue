<template>
  <div class="input-alpha">
    <div class="icon">
      <unicon :name="icon" width="16" height="16"></unicon>
    </div>
    <div class="loader-cont" v-if="loading">
      <loader-alpha :width="20" :height="20" />
    </div>
    <input
      :value="valueComp"
      @input="onInput"
      @change="onChange"
      @keyup.enter="onEnter"
      :list="id"
      type="text"
      :style="{ 'padding-left': icon ? '30px' : '10px' }"
      :placeholder="placeholder"
    />
    <datalist :id="id" v-if="suggestions && suggestions.length > 0">
      <option v-for="(item, i) in suggestions" :key="i" :value="item" />
    </datalist>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import Vue from "vue"

export default Vue.extend({
  name: "input-alpha",
  props: {
    value: {
      type: String,
    },
    placeholder: {
      type: String,
      default: "Search",
      required: false,
    },
    icon: {
      type: String,
      required: false,
      default: null,
    },
    suggestions: {
      type: Array,
      required: false,
      default: () => [],
    },
    id: {
      type: String,
      required: false,
      default: null,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    valueComp: {
      get() {
        return this.value
      },
      set(newValue: string) {
        this.$emit("input", newValue)
      },
    },
  },
  methods: {
    onInput(event: Event) {
      this.$emit("input", event.target.value)
    },
    onChange(event: Event) {
      this.$emit("enter", event.target.value)
    },
    onEnter(event: Event) {
      this.$emit("enter", event.target.value)
    },
  },
})
</script>

<style lang="sass" scoped src="./input-alpha.sass"></style>
