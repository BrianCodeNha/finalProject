import express from 'express';

// middleware
import bodyParser from 'body-parser';
import cors from 'cors'; 

// database
import mongoose from 'mongoose';



// databaseURI
const MONGODB_URI =
  "mongodb+srv://BrianNguyen:097359@cluster0.c8rh7.mongodb.net/lottery";


const app = express();
const PORT = process.env.PORT || 5000;

// all request will go through the below middleware because no route isplaced before them forEx app.use('/', cors) -> only use cors for req to /

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors())


app.get('/', function(req, res) {
    res.send('success')
})


mongoose
  .connect(MONGODB_URI)
  .then((result) => {    
      app.listen(PORT, () => console.log('server is running on ' + PORT))
    
  })
  .catch((err) => {
    console.log(err);
  });
