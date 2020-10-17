import Vue from "vue"
import Vuex from "vuex"
import createLogger from "vuex/dist/logger"
import { camelCase } from "lodash-es"
import { LooseObject } from "@/ts/types/loose-object"

const requireModule = require.context("./modules", true, /^((?!types).)*\.ts$/)
const modules: LooseObject = {}
const modulePaths = []

requireModule.keys().forEach(fileName => {
  const moduleName = camelCase(fileName.replace(/(\.\/|\.ts|(.*\/))/g, ""))
  modulePaths.push({ fileName, moduleName })
  modules[moduleName] = {
    ...requireModule(fileName).default,
  }
})

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== "production"

export default new Vuex.Store({
  modules,
  strict: debug,
  plugins: [...(debug ? [createLogger()] : [])],
})
