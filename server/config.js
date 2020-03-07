module.exports = Object.freeze({
  server: {
    hostname: process.env.SERVER_HOSTNAME,
    port: +process.env.SERVER_PORT,
    env: process.env.NODE_ENV,
    isProduction: process.env.NODE_ENV === 'production',
  },
  database: {
    name: process.env.DATABASE_NAME,
    hostname: process.env.DATABASE_HOSTNAME,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
  accessToken: {
    secret: process.env.ACCESS_TOKEN_SECRET,
    expiresIn: +process.env.ACCESS_TOKEN_EXPIRES_IN,
  },
  refreshToken: {
    expiresIn: +process.env.REFRESH_TOKEN_EXPIRES_IN,
  },
});
