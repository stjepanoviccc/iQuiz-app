import Axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { refreshAccessToken } from '../../services/auth'

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean
}

export const axios = Axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true
})

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers = config.headers || {}
      config.headers['Authorization'] = `Bearer ${token}`
      config.headers['Cache-Control'] = 'no-cache'
    }
    return config
  }

const onRequestError = async (error: AxiosError): Promise<AxiosError> => {
  const originalRequest = error.config as AxiosRequestConfigWithRetry
  if (error.response && error.response.status === 403 && !originalRequest._retry) {
    originalRequest._retry = true
    const access_token = await refreshAccessToken()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token
    try {
      await axios(originalRequest)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return Promise.reject(error)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
axios.interceptors.request.use(onRequest as (value: InternalAxiosRequestConfig<any>) => InternalAxiosRequestConfig<any>, onRequestError)

export default axios
