import express, { NextFunction, Request, Response } from 'express';

const router = express.Router();

router.get('/hello', (request:Request, response:Response, next:NextFunction)=>{
    response.send('hello')
});

//get
router.get('/', (request: Request, response: Response, next:NextFunction) => {
	const data = {hostname: request.hostname, path: request.path, method: request.method}
    response.send(data);
});

export = router;