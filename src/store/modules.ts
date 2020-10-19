// This script automatically loads and register modules to store

import { camelCase } from "lodash-es"
import { LooseObject } from "@/ts/types/loose-object"

const requireModule = require.context("./modules", true, /^((?!types).)*\.ts$/)
const modules: LooseObject = {}
const modulePaths = []

requireModule.keys().forEach(fileName => {
  if (fileName === "index.ts") return
  const moduleName = camelCase(fileName.replace(/(\.\/|\.ts|(.*\/))/g, ""))
  modulePaths.push({ fileName, moduleName })
  modules[moduleName] = {
    // namespaced: true, // won't use it in this instance, we are using manual namespacing
    ...requireModule(fileName).default,
  }
})

export default modules
