import HTTP from "@/utils/http"

export default {
  getAll() {
    return HTTP.get("planets/")
  },
  getByID(id: string) {
    return HTTP.get(`planets/${id}`)
  },
}
