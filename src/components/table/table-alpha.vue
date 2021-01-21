<template>
  <div class="table-alpha">
    <table>
      <thead>
        <tr v-if="headersComp">
          <th v-for="field in headersComp" :key="field.key">
            <div class="cell">
              <button class="header-cell-button" @click="onSort(field.key)" :disabled="!field.sortable">
                {{ field.name }}
                <template v-if="field.sortable">
                  <unicon width="16" height="16" v-if="field.sortDir === 'asc'" name="arrow-up" fill="black" />
                  <unicon width="16" height="16" v-if="field.sortDir === 'desc'" name="arrow-down" fill="black" />
                  <unicon width="16" height="16" v-if="field.sortDir === 'none'" name="arrow-up" fill="#d3d3d3" />
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
              <slot :name="`column_${headersComp[j].key}`" :row="row">
                {{ row[headersComp[j].key] }}
              </slot>
            </div>
          </td>
        </tr>
        <tr v-if="itemsComp && !itemsComp.length && !loading">
          <td :colspan="headersComp.length">
            <div class="pa-32">
              <h3>
                No Data
              </h3>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <transition name="fade">
      <div class="pa-32 loading-cont" v-if="loading">
        <loader-alpha :width="44" :height="44" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
//@ts-nocheck
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
      default: SortDirection.asc,
    },
    loading: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      sortKey: this.sortBy,
      headersComp: this.mapHeaders(),
    }
  },
  computed: {
    itemsComp() {
      const currentSortHeader = this.headersComp.find((item: any) => item.key === this.sortKey)
      console.log("currentSortHeader.sortDir", this.sortKey, currentSortHeader.sortDir)

      if (this.sortKey) {
        return orderBy(this.items, this.sortKey, currentSortHeader.sortDir)
      }
      return this.items
    },
  },
  methods: {
    mapHeaders() {
      return this.headers.map((item: any) => ({
        name: item.name,
        key: item.key,
        sortable: Boolean(item.sortable),
        sortDir: this.sortKey === item.key ? this.sortDir : SortDirection.none,
      }))
    },
    onSort(key: string) {
      const currentSortHeader = this.headersComp.find((item: any) => item.key === this.sortKey)
      const newIndex = this.headersComp.findIndex((item: any) => item.key === key)
      const oldIndex = this.headersComp.findIndex((item: any) => item.key === this.sortKey)

      if (this.sortKey === key) {
        switch (currentSortHeader.sortDir) {
          case SortDirection.asc:
            this.headersComp[newIndex].sortDir = SortDirection.desc
            break
          case SortDirection.desc:
            this.headersComp[newIndex].sortDir = SortDirection.none
            break
          case SortDirection.none:
            this.headersComp[newIndex].sortDir = SortDirection.asc
            break
        }
      } else {
        this.headersComp[oldIndex].sortDir = SortDirection.none
        this.headersComp[newIndex].sortDir = SortDirection.asc
      }
      this.sortKey = key
      this.$emit("sort", key) // might need it
    },
  },
})
</script>

<style lang="sass" scoped src="./table-alpha.sass"></style>
