import express from 'express';
import bodyparser from 'body-parser';
import knex from 'knex';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors'

import {Register} from './controllers/Register/Register.js'
import {Signin} from './controllers/Signin/Signin.js'
import {Detect} from './controllers/Detect/Detect.js'
import {Entires} from './controllers/Entries/Entries.js'
import {Urls} from './controllers/Urls/Urls.js'
import {Toptable} from './controllers/Toptable/Toptable.js'
const app = express();
app.use(bodyparser.json());
app.use(cors());

const db = knex ({
    client:'pg',
    connection : {
        connectionString: process.env.DATABASE_URL, // Using environment variable
        ssl: { rejectUnauthorized: false }
    }
})

app.get('/',(req,res)=>{
    res.send('its working');
})

    app.post ('/register',(req,res)=>{
        Register(req,res,db,bcrypt);
    })

    app.post ('/signin',(req,res)=>{
        Signin(req,res,db,bcrypt);
    })

    app.post('/detect',(req,res)=>{
        Detect(req,res);
    })

    app.put('/updatentries',(req,res)=>{
        Entires(req,res,db);
    })

    app.post('/urls',(req,res)=>{
        console.log('im here')
        Urls(req,res,db);
    })

    app.post('/toptable', (req, res) => {
        Toptable(req, res, db);
      });






app.listen(process.env.PORT || 3001, ()=>{
    console.log(`APP IS RUNNING ON PORT ${process.env.PORT}`);
   
});

