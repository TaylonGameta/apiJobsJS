import * as express from 'express';
import {Application, json} from 'express';
import * as router from './routes/index';
import {createConnection} from 'typeorm';
import "reflect-metadata";

createConnection().then(async connection =>{

    const app: Application = express();

    app.use(json());
    app.use('/', router);

    app.listen(4000, ()=>{
        console.log("running");
    })

})
.catch(error=> console.log(error));

