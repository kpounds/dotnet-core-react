import { action, computed, observable, configure, runInAction } from "mobx"
import { createContext, SyntheticEvent } from "react"
import ActivitiesApi from "../api/ActivitiesApi"
import { Activity } from "../models/Activity"

configure({ enforceActions: "always" })

class ActivityStore {
  @observable
  public activityRegistry = new Map()
  @observable
  public activity: Activity | null = null
  @observable
  public loadingInitial: boolean = false
  @observable
  public submitting: boolean = false
  @observable
  public target = ""

  @computed
  public get activitiesByDate(): [string, Activity[]][] {
    return this.groupActivitiesByDate(Array.from(this.activityRegistry.values()))
  }

  groupActivitiesByDate(activities: Activity[]) {
    const sortedActivities = activities.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    return Object.entries(
      sortedActivities.reduce((activities, activity) => {
        const date = activity.date.split("T")[0]
        activities[date] = activities[date] ? [...activities[date], activity] : [activity]
        return activities
      }, {} as { [key: string]: Activity[] })
    )
  }

  @action
  public loadActivities = async () => {
    this.loadingInitial = true
    try {
      const activities = await ActivitiesApi.getActivityList()
      runInAction("loading activities", () => {
        activities.forEach((activity) => {
          activity.date = activity.date.split(".")[0]
          this.activityRegistry.set(activity.id, activity)
        })
      })
    } catch (error) {
      runInAction("load activities error", () => {
        console.log(error)
      })
    } finally {
      runInAction("finished loading activities", () => {
        this.loadingInitial = false
      })
    }
  }

  @action
  public loadActivity = async (id: string) => {
    let activity = this.getActivity(id)
    if (activity) {
      this.activity = activity
    } else {
      this.loadingInitial = true
      try {
        activity = await ActivitiesApi.getActivityDetails(id)
        runInAction("getting activity", () => {
          this.activity = activity
        })
      } catch (error) {
        runInAction("get activity error", () => {})
        console.log(error)
      } finally {
        runInAction("finished loading activity", () => {
          this.loadingInitial = false
        })
      }
    }
  }

  @action
  public clearActivity = () => {
    this.activity = null
  }

  private getActivity = (id: string): Activity | null => {
    return this.activityRegistry.get(id)
  }

  @action
  public createActivity = async (activity: Activity) => {
    this.submitting = true
    try {
      await ActivitiesApi.createActivity(activity)
      runInAction("creating activity", () => {
        this.activityRegistry.set(activity.id, activity)
      })
    } catch (error) {
      runInAction("create activity error", () => {
        console.log(error)
      })
    } finally {
      runInAction("finished loading create activity", () => {
        this.submitting = false
      })
    }
  }

  @action
  public editActivity = async (activity: Activity) => {
    this.submitting = true
    try {
      await ActivitiesApi.updateActivity(activity)
      runInAction("editing an activity", () => {
        this.activityRegistry.set(activity.id, activity)
        this.activity = activity
      })
    } catch (error) {
      runInAction("edit activity error", () => {
        console.log(error)
      })
    } finally {
      runInAction("finished loading activity", () => {
        this.submitting = false
      })
    }
  }

  @action
  public deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true
    this.target = event.currentTarget.name
    try {
      await ActivitiesApi.deleteActivity(id)
      runInAction("deleting activity", () => {
        this.activityRegistry.delete(id)
      })
    } catch (error) {
      runInAction("delete activity error", () => {
        console.log(error)
      })
    } finally {
      runInAction("finished submitting delete method", () => {
        this.submitting = false
        this.target = ""
      })
    }
  }
}

export default createContext(new ActivityStore())
