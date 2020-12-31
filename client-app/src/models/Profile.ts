import { IPhoto } from "./Photo"

export interface IProfile {
  displayName: string
  username: string
  bio: string
  image: string
  photos: IPhoto[]
}
