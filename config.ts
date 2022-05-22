export const Config = {
  BASE_URL: 'https://api-hub.myponyasia.com/',
  // BASE_URL: 'http://127.0.0.1:5000/',
  URL: {
    AUTH: {
      REFRESH_TOKEN: 'oauth/refresh-token',
    },
    USER: {
      ME: 'v1/user/me'
    }
  },
  COOKIE: {
    // DOMAIN: 'localhost',
    DOMAIN: '.myponyasia.com',
    SECURE: false,
    HTTP_ONLY: false,
    ACCESS_TOKEN: 'SID-MYPONYASIA',
    REFRESH_TOKEN: 'SIDR-MYPONYASIA',
  }
}