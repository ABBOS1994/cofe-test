export type ID = number

export type JwtPayloadType = {
  sub: string
}

export enum Roles {
  ADMIN = 'admin',
  USER = 'user',
}
