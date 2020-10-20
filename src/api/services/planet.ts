import HTTP from "@/utils/http"

export default {
  getAll() {
    return HTTP.get("planets/")
  },
  get(url: string) {
    return HTTP.get(url)
  },
}
