import { UserAuthRequest, UserLoginRequest } from "../interfaces/user"
import UserModel from "../models/UserModel";


export const register = async (data: UserAuthRequest) => {

    const { name, email, password } = data;
    const existingUser = await UserModel.findOne({ email });
    if(existingUser){
        throw new Error("User already exists")
    }

    console.log({ name, email, password});
    return await UserModel.create({ name, email, password});
 

}

export const login = async (data: UserLoginRequest ) => {
    const { email, password } = data;
    

}