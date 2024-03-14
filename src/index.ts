import express, { Express, Request, Response, query } from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import apiRoutes from "./routes/router";
import Database from "./config/database";
import { before as beforeMiddleware, after as afterMiddleware } from "./middlewares/index";
import path from 'path';
import http from 'http';
import { corsConfig, socketCorsConfig } from './config/cors';
import { Server, Socket } from 'socket.io';
import initializeDriverSockets from './sockets/driver.socket'
import initializeCustomerSockets from './sockets/customer.socket';

configDotenv();

const expressPort: number = Number(process.env.EXPRESS_PORT) || 8000;

const app: Express = express();


console.log(corsConfig);
// Setting for CORS
app.use(cors<Request>(corsConfig));

//Setting for Cookie Parser
app.use(cookieParser());

// Setting for JSON acceptence
app.use(express.json());


// Applying before middlewares
if (beforeMiddleware.length !== 0)
    app.use(beforeMiddleware);


// Setting routes
app.use('/api', apiRoutes);


// client
app.use(express.static(path.join(__dirname, '..', 'react', 'dist')));
app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..', 'react', 'dist', 'index.html'));
});


//Applying after middlewares
if (afterMiddleware.length !== 0)
    app.use(afterMiddleware);


const server = http.createServer(app);


// Socket Configuration
const io = new Server(server, { cors: socketCorsConfig });
const driverSockets: Socket[] = [];
initializeDriverSockets(io, driverSockets);
initializeCustomerSockets(io, driverSockets);



(new Database).connect()
    .then(() => {

        console.log("Database Connected!");

        server.listen(expressPort, (): void => {
            console.log('Express Server Connected at Port : ' + expressPort);
        });

    }).catch((err) => {

        console.log("Database Connection Error : " + err);

    })

