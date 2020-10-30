import { IUser, IUserFormValues } from "../models/User"
import HttpAgent from "../utilities/HttpAgent"

class UserApi {
  public current = async (): Promise<IUser> => HttpAgent.get<IUser>("/user")

  public login = async (user: IUserFormValues): Promise<IUser> => HttpAgent.post("/user/login", user)

  public register = async (user: IUserFormValues): Promise<IUser> => HttpAgent.post("/user/register", user)
}

export default new UserApi()
