import { Activity } from "../models/Activity"
import HttpAgent from "../utilities/HttpAgent"

class ActivitiesApi {
  public getActivityList = async (): Promise<Activity[]> => HttpAgent.get<Activity[]>("/activities")

  public getActivityDetails = async (id: string): Promise<Activity> => HttpAgent.get<Activity>(`/activities/${id}`)

  public createActivity = async (activity: Activity): Promise<void> => HttpAgent.post("/activities", activity)

  public updateActivity = async (activity: Activity): Promise<void> =>
    HttpAgent.put(`/activities/${activity.id}`, activity)

  public deleteActivity = async (id: string): Promise<void> => HttpAgent.delete(`/activities/${id}`)

  public attendActivity = async (id: string): Promise<void> => HttpAgent.post(`/activities/${id}/attend`, {})

  public unattendActivity = async (id: string): Promise<void> => HttpAgent.delete(`/activities/${id}/attend`)
}

export default new ActivitiesApi()
