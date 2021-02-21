<template>
  <div class="container mt-32">
    <div class="row mb-32">
      <div class="sm-12 md-4">
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
          <template v-slot:col-created="{ row }">
            {{ formatDate(row.created) }}
          </template>
          <template v-slot:col-edited="{ row }">
            {{ formatDate(row.edited) }}
            <span class="highlight">({{ formatDistance(row.created, row.edited) }})</span>
          </template>
          <template v-slot:col-homeworld="{ row }">
            <button-alpha @click="onPlanetClick(row.homeworld)">
              Planet Name?
            </button-alpha>
          </template>
        </table-alpha>

        <div class="mt-32"></div>

        <div class="mt-32"></div>

        <!-- <table-alpha :show-headers="false" :headers="headers" :items="USERS_COPY" :loading="isLoading" sort-by="name">
          <draggable
            :list="USERS_COPY"
            group="users"
            @change="log"
            @start="drag = true"
            @end="drag = false"
            ghostClass="ghost"
          >
            <transition-group type="transition" :name="!drag ? 'flip-list' : null" tag="tbody">
              <table-row v-for="row in USERS_COPY" :key="row.key">
                <table-col v-for="(header, j) in headers" :key="j">
                  <template v-if="header.key === 'homeworld'">
                    <button-alpha @click="onPlanetClick(row.homeworld)"> Planet Name? </button-alpha>
                  </template>
                  <div v-else>
                    {{ row[header.key] }}
                  </div>
                </table-col>
              </table-row>
            </transition-group>
          </draggable>
        </table-alpha> -->

        <div class="mt-32"></div>

        <table-alpha :headers="headers" :items="USERS_COPY2" :loading="isLoading" sort-by="name">
          <table-row v-for="row in USERS_COPY2" :key="row.key">
            <table-col v-for="(header, j) in headers" :key="j">
              <template v-if="header.key === 'homeworld'">
                <button-alpha @click="onPlanetClick(row.homeworld)"> Planet Name? </button-alpha>
              </template>
              <div v-else>
                {{ row[header.key] }}
              </div>
            </table-col>
          </table-row>
        </table-alpha>
      </div>
    </div>

    <div class="mt-32"></div>

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
//@ts-nocheck
import Vue from "vue"
import api from "@/api/"
import MT from "@/store/modules/users/mutation-types"
import { toNumber, debounce, cloneDeep } from "lodash-es"
import { mapActions, mapState } from "vuex"
import { format, formatDistanceStrict } from "date-fns"
// import draggable from "vuedraggable"
import tableAlpha from "@comp/table/table-alpha.vue"
import inputAlpha from "@comp/input/input-alpha.vue"
import modalAlpha from "@comp/modal/modal-alpha.vue"
import buttonAlpha from "@comp/button/button-alpha.vue"
import { PlanetDTO } from "@/ts/interfaces/planet"
import { UserDTO } from "@/ts/interfaces/user"
import { UserResponseDTO } from "@/ts/interfaces/responses"
import tableCol from "@/components/table/table-col"
import tableRow from "@/components/table/table-row"
import KeyGenerator from "@/utils/key-generator"

export default Vue.extend({
  name: "users",
  components: {
    tableAlpha,
    inputAlpha,
    modalAlpha,
    buttonAlpha,
    tableCol,
    tableRow,
    // draggable,
  },
  data: () => ({
    isLoading: false,
    isModalVisible: false,
    planetInfo: null as PlanetDTO | null,
    isPlanetLoading: false,
    searchQuery: "",
    isSuggestionsLoading: false,
    suggestions: null as string[] | null,
    USERS_COPY: null,
    USERS_COPY2: null,
    drag: false,
    headers: [
      { name: "Name", key: "name", sortable: true },
      { name: "Height", key: "height", sortable: true },
      { name: "Mass", key: "mass", sortable: true },
      { name: "Created", key: "created", sortable: true },
      { name: "Edited", key: "edited", sortable: true },
      { name: "Planet", key: "homeworld", sortable: false },
    ],
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
    this.fetchUsers()
  },
  methods: {
    ...mapActions({
      FETCH_USERS: MT.FETCH_USERS,
      SEARCH_USERS: MT.SEARCH_USERS,
    }),
    log(evt) {
      console.log(evt)
    },
    fetchUsers() {
      this.isLoading = true
      this.FETCH_USERS()
        .then(() => {
          this.USERS_COPY = cloneDeep(this.USERS.map(item => ({ ...item, key: KeyGenerator.generate() })))
          this.USERS_COPY2 = cloneDeep(this.USERS.map(item => ({ ...item, key: KeyGenerator.generate() })))
        })
        .finally(() => {
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
      this.isSuggestionsLoading = true
      api.user
        .search(query)
        .then((response: UserResponseDTO) => {
          this.suggestions = response.count > 0 ? response.results.map((user: UserDTO) => user.name) : []
        })
        .finally(() => {
          this.isSuggestionsLoading = false
        })
    }, 200),
    onEnter(query: string) {
      this.isLoading = true
      this.SEARCH_USERS(query).finally(() => {
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

.flip-list-move
  transition: transform 0.5s

.no-move
  transition: transform 0s
.ghost
  opacity: 0.5
  background: blue
</style>
