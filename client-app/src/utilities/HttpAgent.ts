import axios, { AxiosResponse } from "axios"
import { toast } from "react-toastify"
import { history } from ".."

axios.defaults.baseURL = "http://localhost:5000/api"

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwt")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Network error - make sure API is running!")
  }

  const { data, status, config } = error.response
  if (status === 404) {
    history.push("/notfound")
  }
  if (status === 400 && config.method === "get" && data.errors.hasOwnProperty("id")) {
    history.push("/notfound")
  }
  if (status === 500) {
    toast.error("Server error - check the terminal for more info!")
  }
  throw error
})

export interface IHttpResponse<T> extends Response {
  data: T
}

const responseBody = <T>(response: AxiosResponse<T>) => response.data

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) => setTimeout(() => resolve(response), ms))

export default class HttpAgent {
  public static get = async <T>(url: string): Promise<T> => axios.get(url).then(sleep(1000)).then(responseBody)

  public static post = async <T>(url: string, body: {}): Promise<T> =>
    axios.post(url, body).then(sleep(1000)).then(responseBody)

  public static put = async <T>(url: string, body: {}): Promise<T> =>
    axios.put(url, body).then(sleep(1000)).then(responseBody)

  public static delete = async <T>(url: string): Promise<T> => axios.delete(url).then(sleep(1000)).then(responseBody)

  public static postForm = async <T>(url: string, file: Blob): Promise<T> => {
    let formData = new FormData()
    formData.append("File", file)
    return axios
      .post(url, formData, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody)
  }
}
