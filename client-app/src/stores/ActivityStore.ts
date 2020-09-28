import { action, computed, observable } from "mobx"
import { createContext, SyntheticEvent } from "react"
import ActivitiesApi from "../api/ActivitiesApi"
import { Activity } from "../models/Activity"

class ActivityStore {
  @observable
  public activityRegistry = new Map()
  @observable
  public selectedActivity: Activity | undefined
  @observable
  public editMode: boolean = false
  @observable
  public loadingInitial: boolean = false
  @observable
  public submitting: boolean = false
  @observable
  public target = ""

  @computed
  public get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
  }

  @action
  public loadActivities = async () => {
    this.loadingInitial = true
    try {
      const activities = await ActivitiesApi.getActivityList()
      activities.forEach((activity) => {
        activity.date = activity.date.split(".")[0]
        this.activityRegistry.set(activity.id, activity)
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
      this.activityRegistry.set(activity.id, activity)
      this.editMode = false
    } catch (error) {
      console.log(error)
    } finally {
      this.submitting = false
    }
  }

  @action
  public editActivity = async (activity: Activity) => {
    this.submitting = true
    try {
      await ActivitiesApi.updateActivity(activity)
      this.activityRegistry.set(activity.id, activity)
      this.selectedActivity = activity
      this.editMode = false
    } catch (error) {
      console.log(error)
    } finally {
      this.submitting = false
    }
  }

  @action
  public deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true
    this.target = event.currentTarget.name
    try {
      await ActivitiesApi.deleteActivity(id)
      this.activityRegistry.delete(id)
    } catch (error) {
      console.log(error)
    } finally {
      this.submitting = false
      this.target = ""
    }
  }

  @action
  public openCreateForm = () => {
    this.editMode = true
    this.selectedActivity = undefined
  }

  @action
  public openEditForm = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id)
    this.editMode = true
  }

  @action
  public cancelEditForm = () => {
    this.editMode = false
  }

  @action
  public resetSelectedActivity = () => {
    this.selectedActivity = undefined
  }

  @action
  public setSelectedActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id)
    this.editMode = false
  }
}

export default createContext(new ActivityStore())
