import { Module } from "vuex"
import api from "@/api"
import MT from "./mutation-types"
import { UserDTO } from "@/ts/interfaces/user"
import { ResponseDTO } from "@/ts/interfaces/response"

const state = {
  users: [] as UserDTO[],
}
type State = typeof state

const users: Module<State, State> = {
  state,
  getters: {
    // [MT.GET_USER_BY]: (state: State) => (id: string) => {
    //   //
    // },
  },
  actions: {
    [MT.FETCH_USERS]({ commit }) {
      return api.user.getUsers().then((response: ResponseDTO) => {
        console.log("results", response)
        commit(MT.SET_USERS, response)
      })
    },
  },
  mutations: {
    [MT.SET_USERS](state: State, users: UserDTO[]) {
      state.users = users
    },
  },
}

export default users
