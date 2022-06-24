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

// databaseURI
const MONGODB_URI =
  "mongodb+srv://BrianNguyen:097359@cluster0.c8rh7.mongodb.net/lottery";


const app = express();
const PORT = process.env.PORT || 5000;

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
  origin: ['http://localhost:3000'],
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
    expires: 60 * 60 * 24,
  }
}))

// app.use('/', (req, res, next) => {
//   const userStatus = req.session.userStatus;
//   console.log("🚀 ~ file: app.js ~ line 58 ~ app.use ~ userStatus", userStatus)
//   res.status(200).send(userStatus);
//   next();
// })

// app.use((req, res, next) => {
//   if(!req.session.user){
//     return next();
//   }
//   User.findById(req.session.user._id)
//     .then((user) => {
//       req.user = user;
//       next();
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// });

app.use('/authen', authen)
app.use('/user',  authenticatedUser)
app.use('/admin',  adminRoutes)

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true } )
  .then((result) => {    
     console.log('connected to db')
      app.listen(PORT, () => console.log('server is running on ' + PORT))
    
  })
  .catch((err) => {
    console.log(err); 
  });
