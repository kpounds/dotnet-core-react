import { Activity } from "./Activity"

export interface IActivityFormValues extends Partial<Activity> {
  time?: Date
}
