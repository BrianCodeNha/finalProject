import { User } from "../model/User.js"
import bcrypt from 'bcrypt'


export const getUser = (req, res, next) => {
    try {
        User.find().then(users => {
            res.status(200).json(users)
        })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

export const addUser = async (req, res, next) => {
    
    try {
    const hashPassword = bcrypt.hash(req.body.password, 10)
    console.log("🚀 ~ file: authenticatedUser.js ~ line 18 ~ addUser ~ hashPassword", hashPassword)
    const newUser = new User({
        email: req.body.email,
        username: req.body.username,
        phone: req.body.phone,
        role: req.body.role,
        password: hashPassword,
    })
        await newUser.save();
        await User.find().then(users => {
            res.status(200).json(users)
        })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}



export const createFakeUser = (req, res, next) => {
    const randoom = Math.floor(Math.random() * 10)
    const randoom1 = Math.floor(Math.random() * 1000000)
    const fakeuser = new User({
        email: `test${randoom}@admin.com`,
        phone: `0985${randoom1}`,
        password: `test${randoom}@admin.com`,
        username: `test${randoom}`,
        role: `user`,
    })
    fakeuser.save().then(() => {
        console.log(`fakeUser${randoom} created`)
        res.send(`fakeUser${randoom} created`)
    })
}

