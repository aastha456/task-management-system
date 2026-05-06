import { NUMBER_OF_SALT_ROUNDS } from "../constants/auth";
import { UserAuthRequest, UserLoginRequest } from "../interfaces/user"
import UserModel from "../models/UserModel";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/auth";
import jwt from "jsonwebtoken";
import SessionModel from "../models/SessionModel";
import logger from "../utils/logger";


export const register = async (data: UserAuthRequest) => {

    const { name, email, password, role } = data;
    const existingUser = await UserModel.findOne({ email });
    if(existingUser){
        throw new Error("User already exists")
    }

    const hashedPassword = await bcrypt.hash(password, NUMBER_OF_SALT_ROUNDS)

    return await UserModel.create({ name, email, password: hashedPassword, role: role || "user"});
 

}

export const login = async (data: UserLoginRequest ) => {
    const { email, password } = data;
    logger.info(`[AUTH][LOGIN] Attempt`, { email });

    const user = await UserModel.findOne( {email }).select("+password");
    if(!user){
       logger.warn(`[AUTH][LOGIN] User not found`, { email });
       throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        logger.warn(`[AUTH][LOGIN] Invalid password`, { email });
        throw new Error("Password is invalid");

    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    logger.info(`[AUTH][LOGIN] Success`, { userId: user._id });

    const decoded = jwt.decode(refreshToken) as { exp: number };
    const expiresAt = new Date(decoded.exp * 1000);

    await SessionModel.create({
        userId: user._id,
        refreshToken,
        expiresAt
    })
        
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

export const logout = async (refreshToken: string) => {
    await SessionModel.findOneAndDelete({ refreshToken });
}

export const generateAccessTokenBasedOnRefreshToken = async (refreshToken: string) => {
    const session = await SessionModel.findOne({refreshToken});
    if(!session){
        logger.warn(`[AUTH][REFRESH] Invalid refresh token`);
        throw new Error("Invalid refresh token");
    }

    if(session.expiresAt < new Date()){
        logger.warn(`[AUTH][REFRESH] Expired refresh token`, { userId: session.userId });
        await SessionModel.findByIdAndDelete(session._id);
        throw new Error("Refresh token has expired. Please log in again.");
    }

    const user = await UserModel.findById(session.userId);
    if(!user){
        throw new Error("User not found");
    }
    
    const accessToken = generateAccessToken(user);
    return { accessToken };
}
