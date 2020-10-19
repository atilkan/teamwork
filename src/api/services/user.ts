import HTTP from "@/utils/http"

export default {
  getUsers() {
    return HTTP.get("people/")
  },
  search(query: string) {
    return HTTP.get(`people/?search=${query}`)
  },
}
