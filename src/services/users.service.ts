// src/items/items.service.ts

/**
 * Data Model Interfaces
 */

import { BaseItem, Item } from "../interfaces/items/item.interface";
import { BaseUser, User } from "../interfaces/users/user.interfaces";
import { Users } from "../interfaces/users/users.interface";
import bcrypt from "bcrypt";

/**
 * In-Memory Store
 */
let users: Users = {
    1: {
        id: 1,
        name:"khk",
        userId:"ask03142",
        password:"123",
        email:"aaa@naver.com",
        phone:"01099991111",
        address:"서울시",
        birth: new Date(),
        image:"./"
      },
      2: {
        id: 2,
        name:"khk",
        userId:"ask03142",
        password:"123",
        email:"aaa@naver.com",
        phone:"01099991111",
        address:"서울시",
        birth: new Date(),
        image:"./"
      },
      3: {
        id: 3,
        name:"khk",
        userId:"ask03142",
        password:"123",
        email:"aaa@naver.com",
        phone:"01099991111",
        address:"서울시",
        birth: new Date(),
        image:"./"
      },
}



/**
 * Service Methods
 */

export const findAll = async(): Promise<User[]> => Object.values(users);

export const find = async(id: number): Promise<User> => users[id];

export const create = async(newUser: BaseUser): Promise<User> => {
    const id = new Date().valueOf();
    newUser.password = bcrypt.hashSync(newUser.password, 10);
    users[id] = {id, ...newUser};
    return users[id];
};

export const update = async(id: number, userUpdate: BaseUser): Promise<User | null> =>{
    const user = await find(id);
    if(!user){
        return null;
    }
    users[id] = {id, ...userUpdate};
    return users[id];
};

export const remove = async(id: number): Promise<null | void> =>{
    const user = await find(id);
    if(!user){
        return null;
    }
    delete users[id];
};

