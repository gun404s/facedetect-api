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
        host : '127.0.0.1',
        user : 'postgres',
        password: '74100147',
        database : '_faceDetect'
    }
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

  app.get('/toptable',(req,res)=>{
    Toptable(req,res,db);
  });







app.listen(3001, ()=>{
    console.log('connecting');
   
});

