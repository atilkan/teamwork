<template>
  <div class="table-alpha">
    <table>
      <thead>
        <tr>
          <th v-for="field in fields" :key="field.key">
            <div class="cell">
              <button class="header-cell-button" :disabled="!field.sortable">
                {{ field.name }}
                <template v-if="field.sortable">
                  <unicon name="arrow-up" v-if="field.sortDirection === 'asc'" />
                  <unicon name="arrow-down" v-if="field.sortDirection === 'desc'" />
                </template>
              </button>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in items" :key="i">
          <td v-for="(col, j) in fields" :key="j">
            <div class="cell">
              {{ row[fields[j].key] }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from "vue"

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
  },
  computed: {
    fields() {
      return this.headers.map((item: any) => ({
        name: item.name,
        key: item.key,
        sortable: item.sortable || false,
        sortDirection: null as string | null,
      }))
    },
  },
  methods: {
    onSort(key: string, order = "asc") {
      this.$emit("sort", { key, order })
    },
  },
})
</script>

<style lang="sass" scoped>
@import "./table-alpha.sass"
</style>
