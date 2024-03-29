const API_URL = 'http://127.0.0.1:8000/'
// const API_URL = 'http://vud-api.eu-central-1.elasticbeanstalk.com/'
// const API_URL = 'https://vud-be.active.ro/'

export const API_URL_MEDIA = API_URL

export const REACT_RECAPTCHA_KEY = '6Ld5XZgpAAAAAHrT-c9HIDL49skN28Tb4G-ysOrZ'

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
  //Reset Password
  RESET_PASS: 'auth/password-reset/',
  RESET_PASS_COMPLETE: 'auth/password-reset-complete/',
  // DELETE Profile
  DELETE_PROFILE: 'auth/delete-profile/',
  //ADD REVIEW
  ADD_REVIEW: 'auth/clinic-review/?clinic_id=',
  ADD_REVIEW_DOCTOR: 'auth/doctor-review/?doctor_id=',
  // CRUD User Profile
  // GET User Profile
  USER_PROFILE: 'auth/get-user-profile/',
  // POST Updated field is clinic / is doctor
  UPDATE_USER_PROFILE: 'auth/update-user-profile-type/',
  // PUT Update admin data
  UPDATE_ADMIN_DATA: 'auth/update-admin-data/',
  // PUT Update medical clinic data types
  PUT_MEDICAL_TYPES: 'auth/update-clinic-type-data/',
  // UPDATE Doctor Profile
  PUT_DOCTOR_PROFILE: 'auth/update-doctor-profile/',
  PUT_UPDATE_CLINIC_PROFILE: 'auth/update-clinic-profile/',
  GET_ARTICLE: 'options/blogposts/?blog_id=',
  GET_ARTICLES: 'options/blogposts',
  GET_TAGS: 'options/tags',
  

  // GET TOP Clinics
  GET_TOP_CLINICS: 'auth/get-top-clinics/',
  GET_TOP_DOCTORS: 'auth/get-top-doctors/',
  GET_CLINICS: 'auth/clinics/',
  GET_CLINICS_FILTER: 'auth/get-clinics/',

  // GET Doctor Clinics
  POST_REVIEW: 'auth/doctor-review/',
  GET_DOCTOR_BY_ID: 'auth/doctors/',
  GET_DOCTOR_FILTERED: 'auth/get-doctors/',

  // INVITE
  POST_INVITE_DOCTOR: 'auth/invite-doctor/',
  POST_INVITE_CLINIC: 'auth/invite-clinic/',

  // OPTIONS
  // GET Medical Unity Type
  GET_MEDICAL_UNITY_TYPE: 'options/medical-unity-types/',
  GET_ACADEMIC_DEGREES: 'options/academic-degrees/',
  GET_SPECIALITIES: 'options/specialities/',
  GET_COMPETENCES: 'options/competences/',
  GET_CLINICS_NAMES: 'options/clinics-list/',
  GET_CLINIC_SPECIALITIES: 'options/clinic-specialities/',
  GET_MEDICAL_FACILITIES: 'options/medical-facilities/',
  GET_FOOTER_LABELS: 'options/footer/',
  GET_BANNER_CARDS: 'options/banners/',
  GET_ADDS: 'options/adds',
  POST_NEWSLETTER: 'options/newsletter/',
  POST_REDEEM_CLINIC: 'auth/revendica-clinica/',
  POST_REDEEM_DOCTOR: 'auth/revendica-doctor/',
  SEND_MESSAGE_CLINIC: 'options/send-message-clinic/',
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
  LOGIN: '/login',
  FORGET_PASSWORD: '/forget-password',
  RESET_PASSWORD: '/reset-password',
  REGISTER: '/register',
  ADMIN_DATA: '/admin-data',
  ADD_PROFILE: '/add-profile',
  ADD_UNIT: '/add-medical-unit',
  THANK_YOU: '/thank-you',
  EMAIL_VERIFICATION: '/email-verification',
  RESEND_EMAIL: '/resend-email',
  DELETE_PROFILE: '/delete-profile',
  PROFILE: '/clinic-profile',

  DASHBOARD: '/dashboard',

  DASHBOARD_CLINIC: '/dashboard-clinic',
  DASHBOARD_ADMIN_DATA:'/dashboard-clinic/admin-data-dashboard',
  DASHBOARD_PROFILE_DATA:'/dashboard-clinic/profile-data-dashboard',
  DASHBOARD_UNIT_DATA:'/dashboard-clinic/unit-data-dashboard',

  DASHBOARD_DOCTOR: '/dashboard-doctor',
  DASHBOARD_DOCTOR_DATA:'/dashboard-doctor/doctor-data-dashboard',

  LOG_OUT:'/log-out',
  HOW_TO_REDEEM_CLINIC:'/how-to-redeem-clinic',
  HOW_TO_REDEEM_DOCTOR:'/how-to-redeem-doctor',
  FILTER_PAGE: '/filter',
  TERMS_AND_CONDITION: '/terms-and-cond',
  EXAMPLE_COMPLETE: '/exemplu-completare',
  SINGLE_ARTICLE: '/article',
  ARTICLES:'/articles',
  DOCTOR_DATA: '/doctor-data',
  DOCTOR_PAGE: '/doctor-page',
  NOT_FOUND: '/not-found',
  SEND_CLINIC_REQUEST: '/send-clinic-request'
}

export const AUTH_CLINIC_MAP_STEP = {
  '0': routes.ADD_PROFILE,
  '1': routes.ADD_PROFILE,
  '2': routes.ADMIN_DATA,
  '3': routes.ADD_UNIT,
  '4': routes.PROFILE,
  '5': routes.THANK_YOU,
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
