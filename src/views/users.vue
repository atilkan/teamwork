<template>
  <div class="container mt-32">
    <div class="flex left mb-32">
      <div class="flex middle">
        <input-alpha placeholder="Search by name" :clearable="true">
          <template v-slot:prepend>
            <unicon name="search" />
          </template>
        </input-alpha>
      </div>
    </div>
    <div>
      <table-alpha :headers="headers" :items="USERS" :loading="isLoading" sort-by="name">
        <template v-slot:item_created="{ row }">
          {{ formatDate(row.created) }}
        </template>
        <template v-slot:item_edited="{ row }">
          {{ formatDate(row.edited) }}
          <span class="highlight">({{ formatDistance(row.created, row.edited) }})</span>
        </template>
        <template v-slot:item_homeworld="{ row }">
          <button @click="onPlanetClick(row.homeworld)">
            Planet Name
          </button>
        </template>
      </table-alpha>
    </div>

    <modal-alpha v-model="isModalVisible">
      here
    </modal-alpha>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import MT from "@/store/modules/users/mutation-types"
import { mapActions, mapState } from "vuex"
import { format, formatDistanceStrict } from "date-fns"

export default Vue.extend({
  name: "users",
  components: {
    "table-alpha": () => import("@comp/table/table-alpha.vue"),
    "input-alpha": () => import("@comp/input/input-alpha.vue"),
    "modal-alpha": () => import("@comp/modal/modal-alpha.vue"),
  },
  data: () => ({ isLoading: false, isModalVisible: true }),
  computed: {
    // we use directly state instead of getters
    ...mapState({
      USERS: (state: any) => state.users.users,
      COUNT: (state: any) => state.users.count,
    }),
  },
  created() {
    // non reactive data initilization
    ;(this as any).headers = [
      { name: "Name", key: "name", sortable: true },
      { name: "Height", key: "height", sortable: true },
      { name: "Mass", key: "mass", sortable: true },
      { name: "Created", key: "created", sortable: true },
      { name: "Edited", key: "edited", sortable: true },
      { name: "Planet", key: "homeworld", sortable: false },
    ]
  },
  mounted() {
    this.fetchUsers()
  },
  methods: {
    ...mapActions({
      FETCH_USERS: MT.FETCH_USERS,
    }),
    fetchUsers() {
      this.isLoading = false
      this.FETCH_USERS()
        .catch(() => {
          // handle error
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    formatDate(date: Date) {
      return format(new Date(date), "dd.MM.yyyy HH:mm")
    },
    formatDistance(start: Date, end: Date) {
      return formatDistanceStrict(new Date(start), new Date(end)) + " later"
    },
    onPlanetClick(url: string) {
      // do modal staff
      this.isModalVisible = true
      console.log(url)
    },
  },
})
</script>

<style lang="sass">
@import "@/styles/base/colors.sass"
.highlight
  color: $blue
</style>
