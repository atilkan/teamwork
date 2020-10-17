import axios, { AxiosInstance, AxiosRequestConfig } from "axios"

// BASE_URL is defined inside environment files.
const BASE_URL = process.env.VUE_APP_BASE_URL

const config: AxiosRequestConfig = {
  baseURL: BASE_URL,
}

const HTTP: AxiosInstance = axios.create(config)
HTTP.interceptors.response.use((response: any) => response.data)

export { BASE_URL }
export default HTTP
