import { camelCase } from "lodash-es"
const requireModule = require.context("./services", false, /\.ts$/)
import { LooseObject } from "@/ts/types/loose-object"

const api: LooseObject = {}

requireModule.keys().forEach(fileName => {
  if (fileName === "./index.ts") return
  const moduleName = camelCase(fileName.replace(/(\.\/|\.ts)/g, ""))
  api[moduleName] = {
    ...requireModule(fileName).default,
  }
})

export default api
