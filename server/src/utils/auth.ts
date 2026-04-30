import jwt from 'jsonwebtoken';
import { IUser } from '../models/UserModel';
import { config } from '../config';

export const generateAccessToken = (user: IUser) => {
    return jwt.sign(
        {
            userId: user._id,
            email: user.email,
            role: user.role
        },
        config.JWT_SECRET,{
            expiresIn: "30m"
        }
    )
}

export const generateRefreshToken = ( user: IUser) => {
    return jwt.sign(
        {
            userId: user._id,
            email: user.email
        },
        config.JWT_REFRESH_SECRET,{
            expiresIn: "30d"
        }
    )
}