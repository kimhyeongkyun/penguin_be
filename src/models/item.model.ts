import { BaseItem } from "../interfaces/items/item.interface";


export class Item implements BaseItem {
    name:string;
    price:number;
    description:string;
    image:string;

    constructor(name:string, price:number, description:string, image:string){
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
    } 
}