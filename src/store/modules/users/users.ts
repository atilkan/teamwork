import { Module } from "vuex"
import api from "@/api"
import MT from "./mutation-types"
import { UserDTO } from "@/ts/interfaces/user"
import { UserResponseDTO } from "@/ts/interfaces/responses"

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
    async [MT.FETCH_USERS]({ commit }) {
      try {
        const response: UserResponseDTO = await api.user.getUsers()
        // map only required properties // good for memory and reactive watcher
        response.results.map((item: UserDTO) => ({
          name: item.name,
          height: item.height,
          mass: item.mass,
          created: item.created,
          edited: item.edited,
          homeworld: item.homeworld,
        }))
        commit(MT.SET_USERS, response.results)
        commit(MT.SET_COUNT, response.count)
        commit(MT.SET_PREVIOUS, response.previous)
        commit(MT.SET_NEXT, response.next)
        return response
      } catch (error) {
        // TODO: better error handling
        throw "Can't load user information"
      }
    },
    async [MT.SEARCH_USERS]({ commit }, query: string) {
      try {
        const response: UserResponseDTO = await api.user.search(query)
        // map only required properties // good for memory and reactive watcher
        response.results.map((item: UserDTO) => ({
          name: item.name,
          height: item.height,
          mass: item.mass,
          created: item.created,
          edited: item.edited,
          homeworld: item.homeworld,
        }))
        commit(MT.SET_USERS, response.results)
        commit(MT.SET_COUNT, response.count)
        commit(MT.SET_PREVIOUS, response.previous)
        commit(MT.SET_NEXT, response.next)
        return response
      } catch (error) {
        // TODO: better error handling
        throw "Can't load user information"
      }
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
