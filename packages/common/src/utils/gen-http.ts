import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
export interface GenHttpOptions extends AxiosRequestConfig {
  // appid: string | number
}
export const genHttp = (options: GenHttpOptions) => {
  const http = axios.create({
    ...options,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return async <T>(_options: GenHttpOptions) => {
    const { data } = await http(_options) as AxiosResponse<T>
    return data
  }
}
