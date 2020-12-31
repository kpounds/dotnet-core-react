import { IProfile } from "../models/Profile"
import HttpAgent from "../utilities/HttpAgent"

class ProfilesApi {
  public getProfile = async (username: string): Promise<IProfile> =>
    HttpAgent.get<IProfile>(`/userProfiles/${username}`)
}

export default new ProfilesApi()
