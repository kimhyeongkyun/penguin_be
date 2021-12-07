/**
 * Required External Modules and Interfaces
 */
import { Request, Response } from "express";
import * as userService from "../services/users.service";
import { BaseUser, User } from "../interfaces/users/user.interfaces";
import bcrypt from "bcrypt";

export const findAll =  async(req:Request, res:Response)=>{
    try {
        const users: User[] = await userService.findAll();
        res.status(200).send(users);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
}

export const find = async(req:Request, res:Response)=>{
    const id: number = parseInt(req.params.id, 10);
    try {
        const user: User = await userService.find(id);
        if(user){
            return res.status(200).send(user);
        }
        res.status(404).send("user not found");
    } catch (error: any) {
        res.status(500).send(error.message);
    }
}

export const signUp = async(req:Request, res:Response)=>{
    try{
        const user: BaseUser = req.body;
        const newUser = await userService.create(user);
        res.status(201).send({newUser: newUser});
    }catch(error: any){
        res.status(500).send(error.message);
    }
}

export const signIn = async(req:Request, res:Response)=>{
    try{
        const {userId, password} = req.body;
        const user = await userService.find(userId);
        if(!user){
            res.status(404).send("not found user");
        }else{
            const isEqual = await bcrypt.compare(password, user.password);
            if(isEqual){
                res.status(200).send(user);
            }else{
                res.send(400).json({msg: "not match password"});
            }
        }
    }catch(error: any){
        res.status(500).send(error.message);
    }
}

export const update = async(req:Request, res:Response)=>{
    const id: number = parseInt(req.params.id, 10);
    try{
        const userUpdate: User = req.body;

        const existingUser: User = await userService.find(id);
        if(existingUser){
            const updatedUser = await userService.update(id, userUpdate);
            return res.status(200).send(updatedUser);
        } else{
            const newUser = await userService.create(userUpdate);
            return res.status(201).json(newUser);  
        }
    }catch(error: any){
        res.status(500).send(error.message);
    }
}

export const remove = async(req:Request, res:Response)=>{
    try{
        const id: number = parseInt(req.params.id, 10);
        await userService.remove(id);
        res.sendStatus(204);
    }catch(error: any){
        res.status(500).send(error.message);
    }
}

