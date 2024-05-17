const TokenService = {
    ACCESS_TOKEN_KEY: 'accessToken',
    REFRESH_TOKEN_KEY: 'refreshToken',
    USER_KEY: 'user',
  
    getAccessToken(): string | null {
      return localStorage.getItem(this.ACCESS_TOKEN_KEY)
    },
  
    getRefreshToken(): string | null {
      return localStorage.getItem(this.REFRESH_TOKEN_KEY)
    },

    getUser(): string | null {
      return localStorage.getItem(this.USER_KEY)
    },
  
    setAccessToken(token: string): void {
      localStorage.setItem(this.ACCESS_TOKEN_KEY, token)
    },
  
    setRefreshToken(token: string): void {
      localStorage.setItem(this.REFRESH_TOKEN_KEY, token)
    },

    setUser(username: string): void {
      localStorage.setItem(this.USER_KEY, username)
    },
  
    clearTokens(): void {
      localStorage.removeItem(this.ACCESS_TOKEN_KEY)
      localStorage.removeItem(this.REFRESH_TOKEN_KEY)
    }
  };
  
  export default TokenService