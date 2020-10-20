<template>
  <div class="container mt-32">
    <div class="row mb-32">
      <div class="sm-6">
        <input-alpha
          placeholder="Search by name"
          icon="search"
          v-model="searchQuery"
          @input="onSearch"
          @enter="onEnter"
          :suggestions="suggestions"
          :loading="isSuggestionsLoading"
          id="suggestions"
        />
      </div>
    </div>
    <div class="row">
      <div class="sm-12">
        <table-alpha :headers="headers" :items="USERS" :loading="isLoading" sort-by="name">
          <template v-slot:item_created="{ row }">
            {{ formatDate(row.created) }}
          </template>
          <template v-slot:item_edited="{ row }">
            {{ formatDate(row.edited) }}
            <span class="highlight">({{ formatDistance(row.created, row.edited) }})</span>
          </template>
          <template v-slot:item_homeworld="{ row }">
            <button-alpha @click="onPlanetClick(row.homeworld)">
              Planet Name?
            </button-alpha>
          </template>
        </table-alpha>
      </div>
    </div>

    <modal-alpha v-model="isModalVisible" :loading="isPlanetLoading" @close="onModalClose">
      <div v-if="planetInfo" class="text-left">
        <h3 class="bold mb-4">Planet Information</h3>
        <p><span class="bold">Name:</span> {{ planetInfo.name }}</p>
        <p><span class="bold">Diameter:</span> {{ planetInfo.diameter }}</p>
        <p><span class="bold">Climate:</span> {{ planetInfo.climate }}</p>
        <p><span class="bold">Population:</span> {{ planetInfo.population }}</p>
      </div>
    </modal-alpha>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import api from "@/api/"
import MT from "@/store/modules/users/mutation-types"
import { toNumber, debounce } from "lodash-es"
import { mapActions, mapState } from "vuex"
import { format, formatDistanceStrict } from "date-fns"
import tableAlpha from "@comp/table/table-alpha.vue"
import inputAlpha from "@comp/input/input-alpha.vue"
import modalAlpha from "@comp/modal/modal-alpha.vue"
import buttonAlpha from "@comp/button/button-alpha.vue"
import { PlanetDTO } from "@/ts/interfaces/planet"
import { UserDTO } from "@/ts/interfaces/user"
import { UserResponseDTO } from "@/ts/interfaces/responses"

export default Vue.extend({
  name: "users",
  components: {
    tableAlpha,
    inputAlpha,
    modalAlpha,
    buttonAlpha,
  },
  data: () => ({
    isLoading: false,
    isModalVisible: false,
    planetInfo: null as PlanetDTO | null,
    isPlanetLoading: false,
    searchQuery: "",
    isSuggestionsLoading: false,
    suggestions: null as string[] | null,
  }),
  computed: {
    // we use directly state because getters are expensive
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
    this.fetchUsers()
  },
  methods: {
    ...mapActions({
      FETCH_USERS: MT.FETCH_USERS,
      SEARCH_USERS: MT.SEARCH_USERS,
    }),
    fetchUsers() {
      this.isLoading = true
      this.FETCH_USERS().finally(() => {
        this.isLoading = false
      })
    },
    formatDate(date: Date) {
      return format(new Date(date), "dd LLL yy HH:mm")
    },
    formatDistance(start: Date, end: Date) {
      return formatDistanceStrict(new Date(start), new Date(end)) + " later"
    },
    onPlanetClick(url: string) {
      this.isModalVisible = true
      this.isPlanetLoading = true
      api.planet
        .get(url)
        .then((response: PlanetDTO) => {
          const population =
            response.population !== "unknown"
              ? toNumber(response.population).toLocaleString("en-IE")
              : response.population
          this.planetInfo = {
            name: response.name,
            diameter: toNumber(response.diameter).toLocaleString("en-IE"),
            climate: response.climate,
            population,
          }
        })
        .finally(() => {
          this.isPlanetLoading = false
        })
    },
    onModalClose() {
      this.planetInfo = null
    },
    onSearch: debounce(function(query: string) {
      //@ts-ignore
      this.isSuggestionsLoading = true
      api.user
        .search(query)
        .then((response: UserResponseDTO) => {
          //@ts-ignore
          this.suggestions = response.count > 0 ? response.results.map((user: UserDTO) => user.name) : []
        })
        .finally(() => {
          //@ts-ignore
          this.isSuggestionsLoading = false
        })
    }, 300),
    onEnter(query: string) {
      this.isLoading = true
      this.SEARCH_USERS(query).then(() => {
        this.isLoading = false
      })
    },
  },
})
</script>

<style lang="sass">
@import "@/styles/base/colors.sass"
.highlight
  color: $blue
</style>
