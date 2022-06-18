import { User } from "../model/User.js"

export const getUser = (req, res, next) => {
    try {
        User.find().then(users => {
            res.status(200).json(users)
        })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}



export const createFakeUser = (req, res, next) => {
    const randoom = Math.floor(Math.random() * 10)
    const fakeuser = new User({
        email: `test${randoom}@example.com`,
        password: `test${randoom}@example.com`,
        userName: `test${randoom}`,
    })
    fakeuser.save().then(() => {
        console.log(`fakeUser${randoom} created`)
    })
}

