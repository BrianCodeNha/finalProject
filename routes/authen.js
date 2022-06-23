import express from 'express';
import { User } from '../model/User.js';

const router = express.Router();

router.post('/login', (req, res) => {
    console.log('login', req.body)

    User.findOne({email: req.body.email, password: req.body.passwords}).then((user) => {

        if(user){
            console.log('valid user')
            req.session.authenticated = true;
            req.session.user = user;
            res.status(200).json(user);
            return req.session.save();
        }

    
    }).catch((err) => {
        console.error(err)
    })
})


export default router;