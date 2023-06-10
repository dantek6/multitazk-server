import { Request, Response } from 'express';
import UserModel from '../models/Users';

export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    
    try{
        const newUser = new UserModel({
            username,
            email,
            password
        });
        await newUser.save();
        res.send('register');
    }catch(err){
        console.log(err);
    }
};

export const login = (req: Request, res: Response) => {
    res.send('login');
}
