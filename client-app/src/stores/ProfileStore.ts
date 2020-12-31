import { action, computed, observable, runInAction } from "mobx"
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

  @computed
  public get isCurrentUser() {
    if (this.rootStore.userStore.user && this.profile) {
      return this.rootStore.userStore.user.username === this.profile.username
    }
    return false
  }

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
