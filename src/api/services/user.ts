import HTTP from "@/utils/http"

export default {
  getUsers() {
    return HTTP.get("people/")
  },
}
