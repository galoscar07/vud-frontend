export const setAuthParamsToLocal = (authToken, refreshToken) => {
  localStorage.setItem('authToken', authToken)
  localStorage.setItem('refreshToken', refreshToken)
}

export const getAuthTokenFromLocal = () => {
  return localStorage.getItem('authToken')
}

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken')
}
