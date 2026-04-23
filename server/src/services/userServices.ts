import path from 'node:path';
import UserModel from '../models/UserModel';

export const getAll = async () => {
    return await UserModel.find();
}