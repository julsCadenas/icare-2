import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import deptRoutes from './routes/deptRoutes.js';
import profRoutes from './routes/profRoutes.js';
import consRoutes from './routes/consRoutes.js';
import tutRoutes from './routes/tutRoutes.js';
import accsRoutes from './routes/accsRoutes.js'
import cors from 'cors';
// import jwt from 'jsonwebtoken';
// import auth from './middleware/auth.js';

const app = express();
app.use(express.json()) // middleware
app.use(cors());

app.get('/', (request, response)=>{
    console.log(request);
    return response.status(234).send('trying mern');
});

app.use('/login', accsRoutes);
app.use('/departments', deptRoutes); 
app.use('/professors', profRoutes); 
app.use('/consultation', consRoutes);
app.use('/tutorial', tutRoutes);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('app connected to database');
        app.listen(PORT, () => {
            console.log(`app is listening to port ${PORT}`);
        });
    })
    .catch((e) => {
        console.log(e);
    });
