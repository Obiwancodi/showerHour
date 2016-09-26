module.exports = {
  DATABASE_URL: 'postgres://localhost:5432/showerhour',
  SESSION_SECRET: 'Optimus Prime is my real dad',
  TWITTER: {
    consumerKey: 'INSERT_TWITTER_CONSUMER_KEY_HERE',
    consumerSecret: 'INSERT_TWITTER_CONSUMER_SECRET_HERE',
    callbackUrl: 'INSERT_TWITTER_CALLBACK_HERE'
  },
  FACEBOOK: {
    clientID: 'INSERT_FACEBOOK_CLIENTID_HERE',
    clientSecret: 'INSERT_FACEBOOK_CLIENT_SECRET_HERE',
    callbackURL: 'INSERT_FACEBOOK_CALLBACK_HERE'
  },
  GOOGLE: {
    clientID: '1051391756240-1ca54q92co8aasce0mptbf766qlkteh5.apps.googleusercontent.com',
    clientSecret: 'P66akUR37CnlWZrrd8I0eucQ',
    callbackURL: '/auth/google/callback'
  },
  LOGGING: true,
  NATIVE: true
};
