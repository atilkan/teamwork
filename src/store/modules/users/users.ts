import { Module } from "vuex"
import { toNumber } from "lodash-es"
import api from "@/api"
import MT from "./mutation-types"
import { UserDTO } from "@/ts/interfaces/user"
import { UserResponseDTO } from "@/ts/interfaces/response"

const state = {
  users: null as UserDTO[] | null,
  count: null as number | null,
  next: null as string | null,
  previous: null as string | null,
}
type State = typeof state

const users: Module<State, State> = {
  state,
  actions: {
    [MT.FETCH_USERS]({ commit }) {
      return api.user.getUsers().then((response: UserResponseDTO) => {
        // map only required properties
        const users = response.results.map((user: UserDTO) => ({
          name: user.name,
          height: toNumber(user.height),
          mass: toNumber(user.mass),
          created: user.created,
          edited: user.edited,
          url: user.url,
        }))
        commit(MT.SET_USERS, users)
        commit(MT.SET_COUNT, response.count)
        commit(MT.SET_PREVIOUS, response.previous)
        commit(MT.SET_NEXT, response.next)
        return response
      })
    },
  },
  mutations: {
    [MT.SET_USERS](state: State, users: UserDTO[]) {
      state.users = users
    },
    [MT.SET_COUNT](state: State, count: number) {
      state.count = count
    },
    [MT.SET_NEXT](state: State, next: string) {
      state.next = next
    },
    [MT.SET_PREVIOUS](state: State, previous: string) {
      state.previous = previous
    },
  },
}

export default users
