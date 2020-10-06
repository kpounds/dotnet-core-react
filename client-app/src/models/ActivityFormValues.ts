import { Activity } from "./Activity"

export interface IActivityFormValues extends Partial<Activity> {
  time?: Date
}

export class ActivityFormValues implements IActivityFormValues {
  public id?: string = undefined
  public title: string = ""
  public category: string = ""
  public description: string = ""
  public date?: Date = undefined
  public time?: Date = undefined
  public city: string = ""
  public venue: string = ""

  constructor(formValues?: IActivityFormValues) {
    if (formValues) {
      formValues.time = formValues.date
    }
    Object.assign(this, formValues)
  }
}
