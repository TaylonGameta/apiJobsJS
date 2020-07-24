import * as express from 'express';
import {Application, json} from 'express';
import * as router from './routes/index';
import * as cors from 'cors';
import {createConnection} from 'typeorm';
import "reflect-metadata";

createConnection().then(async connection =>{

    const app: Application = express();
    app.use(cors());

    app.use(json());
    app.use('/', router);

    app.listen(4000, ()=>{
        console.log("running");
    })

})
.catch(error=> console.log(error));

