<template>
  <div class="container mt-32">
    <div class="flex left">
      <input-alpha></input-alpha>
    </div>
    <div>
      <table-alpha :headers="headers" :items="USERS" :loading="isLoading">
        <!-- <template v-slot="items" slot-scope="props">
          <td>
            {{ props.item }}
          </td>
        </template> -->
        <template v-slot:item_url="{ row }">
          {{ row.url }}
        </template>
      </table-alpha>
    </div>

    <!-- <div>Last a modal</div> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import MT from "@/store/modules/users/mutation-types"
import { mapActions, mapState } from "vuex"

export default Vue.extend({
  name: "users",
  components: {
    "table-alpha": () => import("@comp/table/table-alpha.vue"),
    "input-alpha": () => import("@comp/input/input-alpha.vue"),
  },
  data: () => ({ isLoading: false }),
  computed: {
    // use state instead of state getters
    ...mapState({
      USERS: (state: any) => state.users.users,
      COUNT: (state: any) => state.users.count,
    }),
  },
  created() {
    // non reactive data
    ;(this as any).headers = [
      { name: "Name", key: "name", sortable: true },
      { name: "Height", key: "height", sortable: true },
      { name: "Mass", key: "mass", sortable: true },
      { name: "Created", key: "created", sortable: true },
      { name: "Edited", key: "edited", sortable: true },
      { name: "Planet", key: "url", sortable: false },
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
  },
})
</script>
