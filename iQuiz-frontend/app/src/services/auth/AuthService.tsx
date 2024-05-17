import axios from "../../config/axios";
import TokenService from "../token";
import { User } from "../../models/User";

const version = '/api/v1';

export const refreshAccessToken = async (): Promise<{refreshToken: string}> => {
  const refreshToken = TokenService.getRefreshToken()
  const response = await axios.post('/refresh-token', { refreshToken })
  const newAccessToken = response.data.accessToken
  TokenService.setAccessToken(newAccessToken)
  return newAccessToken
};

export const login = async (user: User): Promise<{user: User, accessToken: string, refreshToken: string}> => {
  const response = await axios.post(`${version}/auth/login`, user)
  const { accessToken, refreshToken } = response.data
  TokenService.setUser(user.username)
  TokenService.setAccessToken(accessToken)
  TokenService.setRefreshToken(refreshToken)
  return response.data
};

export const register = async (user: User): Promise<User> => {
  return (await axios.post(`${version}/auth/register`, user)).data
};

export const logout = (): void => {
  TokenService.clearTokens()
};

