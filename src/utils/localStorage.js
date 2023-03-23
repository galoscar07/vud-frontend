export const setAuthParamsToLocal = (authToken, refreshToken) => {
  localStorage.setItem('authToken', authToken)
  localStorage.setItem('refreshToken', refreshToken)
}

export const setUserToLocal = (user) => {
  localStorage.setItem('user_profile', JSON.stringify(user))
}

export const getUserFromLocal = () => {
  return JSON.parse(localStorage.getItem('user_profile') || "{}")
}

export const getAuthTokenFromLocal = () => {
  return localStorage.getItem('authToken')
}

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken')
}

export const logOutFromStorage = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('user')
  localStorage.removeItem('user_profile')
}
