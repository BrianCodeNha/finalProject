import express from 'express';

// middleware
import bodyParser from 'body-parser';
import cors from 'cors'; 

// database
import mongoose from 'mongoose';

//request + cheerio
import request from 'request';
import cheerio from 'cheerio';


//routers
import authenticatedUser from './routes/authenticatedUser.js'
import adminRoutes from './routes/adminRoutes.js'
import authen from './routes/authen.js'

//create session and store in mongodb
import session from 'express-session';
import connectMongoDBSession from 'connect-mongodb-session'
import cookieParser from 'cookie-parser';
import { checkAuthentication } from './controller/authenticatedUser.js';
import { User } from './model/User.js';
import { verifyConnectEmail } from './ulti/mail.js';
import dotenv from 'dotenv'

dotenv.config();

// databaseURI
const MONGODB_URI = process.env.DATABASE_URL;


const app = express();
const PORT = process.env.PORT || 7000;

// all request will go through the below middleware because no route isplaced before them forEx app.use('/', cors) -> only use cors for req to /

// create and setup session
const MongoDBStore = (connectMongoDBSession)(session); 

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
})

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(cors({
  origin: ['https://ephemeral-palmier-d4920f.netlify.app/'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
}))
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(session({ 
  key: 'userId',
  store: store,
  resave:false,
  saveUninitialized: false, 
  secret: 'i am a secret',
  cookie: {
    expires: 60 * 60 * 24 * 1000,
  }
}))

verifyConnectEmail();

app.use('/authen', authen)
app.use('/admin',  adminRoutes)
app.use('/user',  authenticatedUser)

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true } )
  .then((result) => {    
     console.log('connected to db')
      app.listen(PORT, () => console.log('server is running on ' + PORT))
    
  })
  .catch((err) => {
    console.log(err); 
  });
