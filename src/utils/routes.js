// const API_URL = 'http://'
const API_URL_LOCAL = 'https://vud-be.herokuapp.com/'

export const API_MAP = {
  // Creates new account and send link to verify email
  REGISTER: 'auth/register/',
  LOGIN: 'auth/login/',
  // Send link to verify email
  RESEND_REGISTER: 'auth/email-verify-resend/',
  // Verify the token to activate account
  VERIFY_EMAIL: 'auth/email-verify/',
  // Refresh token
  REFRESH_TOKEN: 'auth/refresh-token/',
  // CRUD User Profile
  // GET User Profile
  USER_PROFILE: 'auth/get-user-profile/',
  // POST Updated field is clinic / is doctor
  UPDATE_USER_PROFILE: '/auth/update-user-profile-type/',
  FORGET_PASSWORD:'auth/password-reset-request',
}

export const getAPILink = (url) => {
  // TODO Comment depending on the env
  return API_URL_LOCAL + url
  // return API_URL + url
}

export const routes = {
  HOMEPAGE: '/',
  MEDICAL_INFO: '/medical-information',
  CHARITY: '/charity',
  CONTACT: '/contact',
  CLINIC_PAGE: '/clinic-page',

  // AUTH
  LOGIN: '/login',
  FORGET_PASSWORD: '/forget-password',
  RESET_PASSWORD: '/reset-password',
  REGISTER: '/register',
  ADMIN_DATA: '/admin-data',
  ADD_PROFILE: '/add-profile',
  ADD_UNIT: '/add-medical-unit',
  THANK_YOU: '/thank-you',
  EMAIL_VERIFICATION: '/email-verification',
  DELETE_PROFILE: '/delete-profile',
  PROFILE:'/clinic-profile'
}

export const makeRequestLogged = (url, method, body, authToken) => {
  if (!body) {
    return fetch(url, {
      method: method,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${authToken}`
      }
    })
  }
  return fetch(url, {
    method: method,
    body: body,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'Authorization': `Bearer ${authToken}`
    }
  })
}
