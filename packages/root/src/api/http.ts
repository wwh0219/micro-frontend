import { genHttp } from 'shared/utils/gen-http'

export const http = genHttp({
  baseURL: process.env.BASE_URL
})
