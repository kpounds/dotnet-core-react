import { configure } from "mobx"
import { createContext } from "react"
import ActivityStore from "./ActivityStore"
import CommonStore from "./CommonStore"
import UserStore from "./UserStore"

configure({ enforceActions: "always" })

export class RootStore {
  public activityStore: ActivityStore
  public userStore: UserStore
  public commonStore: CommonStore

  constructor() {
    this.activityStore = new ActivityStore(this)
    this.userStore = new UserStore(this)
    this.commonStore = new CommonStore(this)
  }
}

export const RootStoreContext = createContext(new RootStore())
