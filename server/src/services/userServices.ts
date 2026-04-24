import path from 'node:path';
import UserModel from '../models/UserModel';

export const getAll = async () => {
    return await UserModel.find();
}

export const getById = async (id: string) => {
    const user = await UserModel.findById(id);
    if(!user){
        throw new Error("User not found");
    }
    return user;
}

export const update = async (id: string, data: any) => {
    const user = await UserModel.findByIdAndUpdate(id, data, {new: true});
    if(!user){
        throw new Error("User not found");
    }
    return user;
}

export const remove = async (id: string) => {
    const user = await UserModel.findByIdAndDelete(id);
    if(!user){
        throw new Error("User not found");
    }
    return user;
}