import { action, observable } from "mobx"
import { RootStore } from "./RootStore"

export default class CommonStore {
  public rootStore: RootStore
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
  }

  @observable
  public token: string | null = null
  @observable
  public appLoaded: boolean = false

  @action
  public setToken = (token: string | null) => {
    window.localStorage.setItem("jwt", token!)
    this.token = token
  }

  @action
  public setAppLoaded = () => {
    this.appLoaded = true
  }
}
