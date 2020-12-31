import { action, observable, runInAction } from "mobx"
import ProfilesApi from "../api/ProfilesApi"
import { IProfile } from "../models/Profile"
import { RootStore } from "./RootStore"

export default class ProfileStore {
  public rootStore: RootStore
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
  }

  @observable
  public profile: IProfile | null = null
  @observable
  public loadingProfile: boolean = true

  @action
  public loadProfile = async (username: string) => {
    this.loadingProfile = true
    try {
      const profile = await ProfilesApi.getProfile(username)
      runInAction(() => {
        this.profile = profile
      })
    } catch (error) {
      console.log(error)
    } finally {
      runInAction(() => {
        this.loadingProfile = false
      })
    }
  }
}
