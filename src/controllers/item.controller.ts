/**
 * Required External Modules and Interfaces
 */
import { Request, Response } from "express";
import * as ItemService from "../services/items.service";
import { BaseItem, Item } from "../interfaces/items/item.interface";
import {signToken} from "../middleware/authz.middleware";

export const findAll =  async(req:Request, res:Response)=>{
    try {
        const items: Item[] = await ItemService.findAll();
        res.status(200).send(items);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
}

export const find = async(req:Request, res:Response)=>{
    const id: number = parseInt(req.params.id, 10);
    try {
        const item: Item = await ItemService.find(id);
        if(item){
            return res.status(200).send(item);
        }
        res.status(404).send("item not found");
    } catch (error: any) {
        res.status(500).send(error.message);
    }
}

export const create = async(req:Request, res:Response)=>{
    try{
        const item: BaseItem = req.body;
        const newItem = await ItemService.create(item);
        res.status(201).send({newItem: newItem});
    }catch(error: any){
        res.status(500).send(error.message);
    }
}

export const update = async(req:Request, res:Response)=>{
    const id: number = parseInt(req.params.id, 10);
    try{
        const itemUpdate: Item = req.body;

        const existingItem: Item = await ItemService.find(id);
        if(existingItem){
            const updatedItem = await ItemService.update(id, itemUpdate);
            return res.status(200).send(updatedItem);
        } else{
            const newItem = await ItemService.create(itemUpdate);
            return res.status(201).json(newItem);  
        }
    }catch(error: any){
        res.status(500).send(error.message);
    }
}

export const remove = async(req:Request, res:Response)=>{
    try{
        const id: number = parseInt(req.params.id, 10);
        await ItemService.remove(id);
        res.sendStatus(204);
    }catch(error: any){
        res.status(500).send(error.message);
    }
}

