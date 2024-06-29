import * as dotenv from 'dotenv'

dotenv.config()

export const config = {
  serverPort: process.env.PORT ? Number(process.env.PORT) : 3001,
  JWTAcSecretKey: process.env.JWT_AC_SECRET_KEY,
  JWTRfSecretKey: process.env.JWT_RF_SECRET_KEY,
  JWTResetPasswordExpires: process.env.JWT_RESET_PASSWORD_EXPIRES,
  JWTAcExpires: process.env.JWT_AC_EXPIRES,
  JWTRfExpires: process.env.JWT_RF_EXPIRES,
  fileSize: process.env.FILE_SIZE ? Number(process.env.FILE_SIZE) : 100,
}
