// const API_URL = 'http://'
const API_URL_LOCAL = 'http://localhost:8000/'

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

  // AUTH
  LOGIN: '/login',
  FORGET_PASSWORD: '/forget-password',
  REGISTER: '/register',
  ADMIN_DATA: '/admin-data',
  ADD_PROFILE: '/add-profile',
  ADD_UNIT: '/add-medical-unit',
  THANK_YOU: '/thank-you',
  EMAIL_VERIFICATION: '/email-verification',
  DELETE_PROFILE: '/delete-profile',
  PROFILE:'/clinic-profile'
}
