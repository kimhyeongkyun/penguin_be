/**
 * Required External Modules and Interfaces
 */
 import express from "express";
 import { find, findAll, remove, signIn, signUp, update } from "../controllers/user.controller"; 
 /**
  * Router Definition
  */
 export const userRouter = express.Router();
 
 /**
  * Controller Definitions
  */

 // GET Users / retreive
 userRouter.get("/",findAll);
 
 // GET User/:id / retreive
 userRouter.get("/:id",find);
 

 // POST User / login
userRouter.post("/signIn", signIn);

 // POST User / signUp
 userRouter.post("/signUp", signUp);
  
 // PUT User/:id
 userRouter.put("/modify/:id", update);
 
 // DELETE User/:id
 userRouter.delete("/withdraw/:id", remove);
