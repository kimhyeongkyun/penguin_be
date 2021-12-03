/**
 * Required External Modules
 */
import bodyParser from 'body-parser';
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import express, {NextFunction, Request, Response} from 'express';
import router from './routers';
import { itemRouter } from './routers/items.router';
import { errorHandler } from './middleware/error.middleware';
import { notFoundHandler } from './middleware/not-found.middleware';

dotenv.config();

/**
 * App Variables
 */
if(!process.env.PORT) process.exit(1);

const PORT: number = parseInt(process.env.PORT as string, 10);
const app:express.Application = express();

function loggerMiddleware(reqest: Request, response: Response, next:NextFunction){
    console.log(`${reqest.method} ${reqest.path}`);
    next();
}

/**
 *  App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);
app.use(bodyParser.json());
app.use('/api', router);
app.use("/api/menu/items", itemRouter);

app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Server Activation
 */
app.listen(PORT, ()=>{
    console.log(`Timezones by location application is running on port ${PORT}.`);
});

export default app;
