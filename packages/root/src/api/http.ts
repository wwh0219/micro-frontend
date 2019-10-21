import { genHttp } from 'common/utils/gen-http'

export const http = genHttp({
  baseURL: process.env.BASE_URL
})
