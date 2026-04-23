import { NUMBER_OF_SALT_ROUNDS } from "../constants/auth";
import { UserAuthRequest, UserLoginRequest } from "../interfaces/user"
import UserModel from "../models/UserModel";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/auth";


export const register = async (data: UserAuthRequest) => {

    const { name, email, password } = data;
    const existingUser = await UserModel.findOne({ email });
    if(existingUser){
        throw new Error("User already exists")
    }

    const hashedPassword = await bcrypt.hash(password, NUMBER_OF_SALT_ROUNDS)

    return await UserModel.create({ name, email, password: hashedPassword});
 

}

export const login = async (data: UserLoginRequest ) => {
    const { email, password } = data;
    const user = await UserModel.findOne( {email }).select("+password");
    if(!user){
       throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        throw new Error("Password is invalid");

    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
        
    return { 
        accessToken,
        refreshToken,
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    }
    
}