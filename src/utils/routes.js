// const API_URL_DEV = 'http://127.0.0.1:8000/'
const API_URL = 'https://vud-be.herokuapp.com/'

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
  // Forget Password
  FORGET_PASSWORD: 'auth/password-reset-request/',
  // CRUD User Profile
  // GET User Profile
  USER_PROFILE: 'auth/get-user-profile/',
  // POST Updated field is clinic / is doctor
  UPDATE_USER_PROFILE: 'auth/update-user-profile-type/',
  // PUT Update admin data
  UPDATE_ADMIN_DATA: 'auth/update-admin-data/',
  // PUT Update medical clinic data types
  PUT_MEDICAL_TYPES: 'auth/update-clinic-type-data/',
  PUT_UPDATE_CLINIC_PROFILE: 'auth/update-clinic-profile/',

  // OPTIONS
  // GET Medical Unity Type
  GET_MEDICAL_UNITY_TYPE: 'options/medical-unity-types/',
  GET_ACADEMIC_DEGREES: 'options/academic-degrees/',
  GET_SPECIALITIES: 'options/specialities/',
  GET_COMPETENCES: 'options/competences/',
  GET_CLINIC_SPECIALITIES: 'options/clinic-specialities/',
  GET_MEDICAL_FACILITIES: 'options/medical-facilities/',
  GET_FOOTER_LABELS: 'options/footer/',
  POST_NEWSLETTER: 'options/newsletter/'
}

export const getAPILink = (url) => {
  // return API_URL_DEV + url
  return API_URL + url
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
  PROFILE: '/clinic-profile',
  DASHBOARD: '/dashboard',
  FILTER_PAGE: '/filter'
}

export const AUTH_CLINIC_MAP_STEP = {
  '0': routes.ADD_PROFILE,
  '1': routes.ADD_PROFILE,
  '2': routes.ADMIN_DATA,
  '3': routes.ADD_UNIT,
  '4': routes.PROFILE,
  '5': routes.THANK_YOU
}

export const makeRequestLogged = (url, method, body, authToken, type = null) => {
  if (!body) {
    return fetch(url, {
      method: method,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${authToken}`
      }
    })
  }
  if (type) {
    return fetch(url, {
      method: method,
      body: body,
      headers: {
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
