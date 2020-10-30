import { createContext } from "react"
import ActivityStore from "./ActivityStore"
import UserStore from "./UserStore"

export class RootStore {
  public activityStore: ActivityStore
  public userStore: UserStore

  constructor() {
    this.activityStore = new ActivityStore(this)
    this.userStore = new UserStore(this)
  }
}

export const RootStoreContext = createContext(new RootStore())
