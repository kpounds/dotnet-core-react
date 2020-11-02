import { action, computed, observable, runInAction } from "mobx"
import { history } from ".."
import UserApi from "../api/UserApi"
import { IUser, IUserFormValues } from "../models/User"
import { RootStore } from "./RootStore"

export default class UserStore {
  public rootStore: RootStore
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
  }

  @observable
  public user: IUser | null = null

  @computed
  public get isLoggedIn() {
    return !!this.user
  }

  @action
  public login = async (values: IUserFormValues) => {
    try {
      const user = await UserApi.login(values)
      runInAction("Set logged in user", () => {
        this.user = user
      })
      this.rootStore.commonStore.setToken(user.token)
      history.push("/activities")
    } catch (error) {
      throw error.response
    }
  }

  @action
  public logout = () => {
    this.rootStore.commonStore.setToken(null)
    this.user = null
    history.push("/")
  }
}
