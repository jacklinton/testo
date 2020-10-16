import jsforce from 'jsforce'

export const oauth2 = new jsforce.OAuth2({
  loginUrl : process.env.LOGIN_URL,
  clientId : process.env.CLIENT_ID,
  clientSecret : process.env.CLIENT_SECRET,
  redirectUri : 'https://localhost:8443/token'
})
