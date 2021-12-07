export interface BaseUser{
    name: string;
    userId:string;
    password: string;
    email: string;
    phone: string;
    address: string;
    birth: Date;
    image: string
}

export interface User extends BaseUser{
    id: number;
}