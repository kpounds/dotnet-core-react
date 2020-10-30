import { action, computed, observable, runInAction } from "mobx"
import { createContext } from "react"
import UserApi from "../api/UserApi"
import { IUser, IUserFormValues } from "../models/User"

class UserStore {
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

export default createContext(new UserStore())
