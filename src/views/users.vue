<template>
  <div>
    <p>
      Users
    </p>
    <div>
      Search by Name
    </div>
    <div>
      table here
    </div>

    <div>Last a modal</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import MT from "@/store/modules/users/mutation-types"
import { createNamespacedHelpers } from "vuex"
const { mapActions } = createNamespacedHelpers("users")

export default Vue.extend({
  name: "users",
  mounted() {
    this.FETCH_USERS()
  },
  methods: {
    ...mapActions({
      FETCH_USERS: MT.FETCH_USERS,
    }),
  },
})
</script>
