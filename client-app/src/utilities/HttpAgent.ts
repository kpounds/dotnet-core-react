import axios, { AxiosResponse } from "axios"

axios.defaults.baseURL = "http://localhost:5000/api"

export interface IHttpResponse<T> extends Response {
  data: T
}

const responseBody = <T>(response: AxiosResponse<T>) => response.data

export default class HttpAgent {
  public static get = async <T>(url: string): Promise<T> => axios.get(url).then(responseBody)

  public static post = async <T>(url: string, body: {}): Promise<T> => axios.post(url, body).then(responseBody)

  public static put = async <T>(url: string, body: {}): Promise<T> => axios.put(url, body).then(responseBody)

  public static delete = async <T>(url: string): Promise<T> => axios.delete(url).then(responseBody)
}
