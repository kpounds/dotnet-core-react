import { action, computed, observable, runInAction } from "mobx"
import { toast } from "react-toastify"
import ProfilesApi from "../api/ProfilesApi"
import { IPhoto } from "../models/Photo"
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
  @observable
  public uploadingPhoto: boolean = false
  @observable
  public loading: boolean = false

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

  @action
  public uploadPhoto = async (file: Blob) => {
    this.uploadingPhoto = true
    try {
      const photo = await ProfilesApi.uploadPhoto(file)
      runInAction(() => {
        if (this.profile) {
          this.profile.photos.push(photo)
          if (photo.isMain && this.rootStore.userStore.user) {
            this.rootStore.userStore.user.image = photo.url
            this.profile.image = photo.url
          }
        }
      })
    } catch (error) {
      console.log(error)
      toast.error("Problem uploading photo")
    } finally {
      runInAction(() => {
        this.uploadingPhoto = false
      })
    }
  }

  @action
  public setMainPhoto = async (photo: IPhoto) => {
    this.loading = true
    try {
      await ProfilesApi.setMainPhoto(photo.id)
      runInAction(() => {
        this.rootStore.userStore.user!.image = photo.url
        this.profile!.photos.find((a) => a.isMain)!.isMain = false
        this.profile!.photos.find((a) => a.id === photo.id)!.isMain = true
        this.profile!.image = photo.url
      })
    } catch (error) {
      toast.error("Problem setting photo as main")
    } finally {
      runInAction(() => {
        this.loading = false
      })
    }
  }
}
