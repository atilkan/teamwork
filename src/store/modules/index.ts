import { camelCase } from "lodash-es"
import { LooseObject } from "@/ts/types/loose-object"

const requireModule = require.context("./", true, /^((?!types).)*\.ts$/)
const modules: LooseObject = {}
const modulePaths = []

requireModule.keys().forEach(fileName => {
  if (fileName === "index.ts") return
  const moduleName = camelCase(fileName.replace(/(\.\/|\.ts|(.*\/))/g, ""))
  modulePaths.push({ fileName, moduleName })
  modules[moduleName] = {
    namespaced: true,
    ...requireModule(fileName).default,
  }
})

export default modules
