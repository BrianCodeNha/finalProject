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





// databaseURI
const MONGODB_URI =
  "mongodb+srv://BrianNguyen:097359@cluster0.c8rh7.mongodb.net/lottery";


const app = express();
const PORT = process.env.PORT || 5000;

// all request will go through the below middleware because no route isplaced before them forEx app.use('/', cors) -> only use cors for req to /

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors())



app.use('/user', authenticatedUser)
app.use('/admin', adminRoutes)

app.use('/', (req, res) => {
  res.send('day la trang chu')
})


mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true } )
  .then((result) => {    
     console.log('connected to db')
      app.listen(PORT, () => console.log('server is running on ' + PORT))
    
  })
  .catch((err) => {
    console.log(err); 
  });
