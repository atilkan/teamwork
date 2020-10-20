<template>
  <div class="table-alpha">
    <table>
      <thead>
        <tr>
          <th v-for="field in headersComp" :key="field.key">
            <div class="cell">
              <button class="header-cell-button" @click="onSort(field.key)" :disabled="!field.sortable">
                {{ field.name }}
                <template v-if="field.sortable && sortKey === field.key && sortDirLocal !== 'none'">
                  <unicon width="16" height="16" :name="sortDirLocal === 'asc' ? 'arrow-up' : 'arrow-down'" />
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
              <slot :name="`item_${headersComp[j].key}`" :row="row">
                {{ row[headersComp[j].key] }}
              </slot>
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
    sortKey: null as null | string,
    sortDirLocal: "asc" as SortDirection,
    sortClickCount: 0,
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
      if (this.sortKey && this.sortDirLocal !== SortDirection.none) {
        return orderBy(this.items, this.sortKey, this.sortDirLocal)
      }
      return this.items
    },
  },
  mounted() {
    this.sortKey = this.sortBy
    this.sortDirLocal = this.sortDir as SortDirection
  },
  methods: {
    onSort(key: string) {
      if (this.sortKey === key) {
        switch (this.sortDirLocal) {
          case SortDirection.asc:
            this.sortDirLocal = SortDirection.desc
            break
          case SortDirection.desc:
            this.sortDirLocal = SortDirection.none
            break
          case SortDirection.none:
            this.sortDirLocal = SortDirection.asc
            break
        }
      } else {
        this.sortKey = key
        this.sortDirLocal = SortDirection.asc
      }
    },
  },
})
</script>

<style lang="sass" scoped src="./table-alpha.sass"></style>
