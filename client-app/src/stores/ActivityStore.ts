import { action, observable } from "mobx"
import { createContext } from "react"
import ActivitiesApi from "../api/ActivitiesApi"
import { Activity } from "../models/Activity"

class ActivityStore {
  @observable
  public activities: Activity[] = []
  @observable
  public selectedActivity: Activity | undefined
  @observable
  public editMode: boolean = false
  @observable
  public loadingInitial: boolean = false
  @observable
  public submitting: boolean = false

  @action
  public loadActivities = async () => {
    this.loadingInitial = true
    try {
      const activities = await ActivitiesApi.getActivityList()
      activities.forEach((activity) => {
        activity.date = activity.date.split(".")[0]
        this.activities.push(activity)
      })
    } catch (error) {
      console.log(error)
    } finally {
      this.loadingInitial = false
    }
  }

  @action
  public createActivity = async (activity: Activity) => {
    this.submitting = true
    try {
      await ActivitiesApi.createActivity(activity)
      this.activities.push(activity)
      this.editMode = false
    } catch (error) {
      console.log(error)
    } finally {
      this.submitting = false
    }
  }

  @action
  public openCreateForm = () => {
    this.editMode = true
    this.selectedActivity = undefined
  }

  @action
  public setSelectedActivity = (id: string) => {
    this.selectedActivity = this.activities.find((a) => a.id === id)
    this.editMode = false
  }
}

export default createContext(new ActivityStore())
