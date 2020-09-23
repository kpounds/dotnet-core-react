import { action, observable } from "mobx"
import { createContext } from "react"
import ActivitiesApi from "../api/ActivitiesApi"
import { Activity } from "../models/Activity"

class ActivityStore {
  @observable
  public activities: Activity[] = []
  @observable
  public loadingInitial: boolean = false

  @action
  public loadActivities = () => {
    this.loadingInitial = true
    ActivitiesApi.getActivityList()
      .then((activities) => {
        activities.forEach((activity) => {
          activity.date = activity.date.split(".")[0]
          this.activities.push(activity)
        })
      })
      .finally(() => (this.loadingInitial = false))
  }
}

export default createContext(new ActivityStore())
