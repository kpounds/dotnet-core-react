import { action, observable, reaction } from "mobx"
import { RootStore } from "./RootStore"

export default class CommonStore {
  public rootStore: RootStore
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore

    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.setItem("jwt", token)
        } else {
          window.localStorage.removeItem("jwt")
        }
      }
    )
  }

  @observable
  public token: string | null = window.localStorage.getItem("jwt")
  @observable
  public appLoaded: boolean = false

  @action
  public setToken = (token: string | null) => {
    this.token = token
  }

  @action
  public setAppLoaded = () => {
    this.appLoaded = true
  }
}
