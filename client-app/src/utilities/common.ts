import { Activity } from "../models/Activity"
import { IUser } from "../models/User"

export const combineDateAndTime = (date: Date, time: Date) => {
  const timeString = time.getHours() + ":" + time.getMinutes() + ":00"

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const dateString = `${year}-${month}-${day}`

  return new Date(dateString + " " + timeString)
}

export const setActivityProps = (activity: Activity, user: IUser) => {
  activity.date = new Date(activity.date)
  activity.isGoing = activity.attendees.some((a) => a.username === user.username)
  activity.isHost = activity.attendees.some((a) => a.username === user.username && a.isHost)
  return activity
}
