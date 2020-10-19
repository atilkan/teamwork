<template>
  <div class="table-alpha">
    <table>
      <thead>
        <tr>
          <th v-for="field in headersComp" :key="field.key">
            <div class="cell">
              <button class="header-cell-button" @click="onSort(field.key)" :disabled="!field.sortable">
                {{ field.name }}
                <template v-if="field.sortable && sortByLocal === field.key">
                  <unicon name="arrow-up" v-if="sortDirLocal === 'asc'" />
                  <unicon name="arrow-down" v-if="sortDirLocal === 'desc'" />
                </template>
              </button>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in itemsComp" :key="i">
          <td v-for="(col, j) in headersComp" :key="j">
            <div class="cell">
              {{ row[headersComp[j].key] }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { orderBy } from "lodash-es"
import { SortDirection } from "@/ts/enum/sort-direction"

export default Vue.extend({
  name: "table-alpha",
  props: {
    headers: {
      type: Array,
      required: false,
      default: null,
    },
    items: {
      type: Array,
      required: false,
      default: null,
    },
    sortBy: {
      type: String,
      required: false,
      default: null,
    },
    sortDir: {
      type: String,
      required: false,
      default: "asc" as SortDirection,
    },
  },
  data: () => ({
    sortByLocal: null as null | string,
    sortDirLocal: "asc" as SortDirection,
  }),
  computed: {
    headersComp() {
      return this.headers.map((item: any) => ({
        name: item.name,
        key: item.key,
        sortable: item.sortable || false,
      }))
    },
    itemsComp() {
      if (this.sortByLocal) {
        return orderBy(this.items, this.sortByLocal, this.sortDirLocal)
      }
      return this.items
    },
  },
  mounted() {
    this.sortByLocal = this.sortBy
    this.sortDirLocal = this.sortDir as SortDirection
  },
  methods: {
    onSort(key: string) {
      // this.$emit("sort", { key, order })
      if (this.sortByLocal === key) {
        if (this.sortDirLocal === SortDirection.asc) {
          this.sortDirLocal = SortDirection.desc
        } else if (this.sortDirLocal === SortDirection.desc) {
          this.sortDirLocal = SortDirection.asc
        }
      } else {
        this.sortByLocal = key
        this.sortDirLocal = SortDirection.asc
      }
    },
  },
})
</script>

<style lang="sass" scoped>
@import "./table-alpha.sass"
</style>
