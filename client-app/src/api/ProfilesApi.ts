import { IPhoto } from "../models/Photo"
import { IProfile } from "../models/Profile"
import HttpAgent from "../utilities/HttpAgent"

class ProfilesApi {
  public getProfile = async (username: string): Promise<IProfile> =>
    HttpAgent.get<IProfile>(`/userProfiles/${username}`)

  public uploadPhoto = async (photo: Blob): Promise<IPhoto> => HttpAgent.postForm<IPhoto>("/photos", photo)

  public setMainPhoto = async (id: string): Promise<void> => HttpAgent.post(`/photos/${id}/setMain`, {})

  public deletePhoto = async (id: string): Promise<void> => HttpAgent.delete(`/photos/${id}`)

  public editProfile = async (displayName: string, bio?: string): Promise<void> =>
    HttpAgent.put("/userProfiles", { displayName, bio })
}

export default new ProfilesApi()
