<template>
  <div class="table-alpha">
    <table>
      <thead v-if="showHeaders">
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
        <table-row v-for="(row, i) in itemsComp" :row="row" :key="i">
          <table-col v-for="(col, j) in headersComp" :key="j">
            <slot :name="`col-${headersComp[j].key}`" :row="row">
              {{ row[headersComp[j].key] }}
            </slot>
          </table-col>
        </table-row>

        <tr v-if="itemsComp && !itemsComp.length && !loading">
          <td :colspan="headersComp.length">
            <div class="pa-32">
              <h3>No Data</h3>
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
import { SortDir } from "@/ts/enum/sort-dir"
import tableCol from "./table-col"
import tableRow from "./table-row"

export default Vue.extend({
  name: "table-alpha",
  components: { tableCol, tableRow },
  props: {
    headers: {
      type: Array,
      required: false,
      default: null,
    },
    showHeaders: {
      type: Boolean,
      required: false,
      default: true,
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
      default: SortDir.asc,
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
      // console.log("currentSortHeader.sortDir", this.sortKey, currentSortHeader.sortDir)
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
        sortDir: this.sortKey === item.key ? this.sortDir : SortDir.none,
      }))
    },
    onSort(key: string) {
      const currentSortHeader = this.headersComp.find((item: any) => item.key === this.sortKey)
      const newIndex = this.headersComp.findIndex((item: any) => item.key === key)
      const oldIndex = this.headersComp.findIndex((item: any) => item.key === this.sortKey)

      console.log("this.sortKey", this.sortKey)
      console.log("key", key)

      if (this.sortKey === key) {
        switch (currentSortHeader.sortDir) {
          case SortDir.asc:
            this.headersComp[newIndex].sortDir = SortDir.desc
            break
          case SortDir.desc:
            this.headersComp[newIndex].sortDir = SortDir.none
            break
          case SortDir.none:
            this.headersComp[newIndex].sortDir = SortDir.asc
            this.sortKey = this.sortBy
            return
        }
      } else {
        this.headersComp[oldIndex].sortDir = SortDir.none
        this.headersComp[newIndex].sortDir = SortDir.asc
      }
      this.sortKey = key
      this.$emit("sort", key) // might need it
    },
  },
})
</script>

<style lang="sass" src="./table-alpha.sass"></style>
