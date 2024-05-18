import Axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { refreshAccessToken } from '../../services/auth'
import TokenService from '../../services/token'

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean
}

export const axios = Axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true
})

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const accessToken = TokenService.getAccessToken()
    const refreshToken = TokenService.getRefreshToken()
    if (accessToken) {
      config.headers = config.headers || {}
      config.headers['Authorization'] = `Bearer ${accessToken}`
      config.headers['Cache-Control'] = 'no-cache'
      config.headers['x-refresh-token'] = refreshToken
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

axios.interceptors.request.use(onRequest, onRequestError)

export default axios
