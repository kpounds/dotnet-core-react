import { action, computed, observable, runInAction } from "mobx"
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
  public get itLoggedIn() {
    return !!this.user
  }

  @action
  public login = async (values: IUserFormValues) => {
    try {
      const user = await UserApi.login(values)
      runInAction(() => {
        this.user = user
      })
    } catch (error) {
      console.log(error)
    }
  }
}
