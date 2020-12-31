import { IPhoto } from "../models/Photo"
import { IProfile } from "../models/Profile"
import HttpAgent from "../utilities/HttpAgent"

class ProfilesApi {
  public getProfile = async (username: string): Promise<IProfile> =>
    HttpAgent.get<IProfile>(`/userProfiles/${username}`)

  public uploadPhoto = async (photo: Blob): Promise<IPhoto> => HttpAgent.postForm<IPhoto>("/photos", photo)
}

export default new ProfilesApi()
