import { IAttendee } from "./Attendee"

export class Activity {
  public id: string = ""
  public title: string = ""
  public description: string = ""
  public category: string = ""
  public date: Date = new Date()
  public city: string = ""
  public venue: string = ""
  public isGoing: boolean = false
  public isHost: boolean = false
  public attendees: IAttendee[] = []
}
