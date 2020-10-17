import HTTP from "@/utils/http"

export default {
  getAll() {
    return HTTP.get("people/")
  },
}
