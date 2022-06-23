import { User } from "../model/User.js";


export const updateUser = async(req, res) => {    
    console.log("🚀 ~ file: ticket.js ~ line 42 ~ addTicket ~ req", req.body)
       try {
        const updatedUser = req.body;
        const id = updatedUser.id;
        await User.findByIdAndUpdate(id, updatedUser)
        await User.find().then(users => {
            res.status(200).json(users)
        })
       } catch (error) {
           res.status(500).json({error: error})       
       } 
    }

export const deleteManyUsers = async (req, res) => {
    const idList = req.body.idList;
    console.log("🚀 ~ file: admin.js ~ line 3 ~ deleteManyUsers ~ idList", idList)
    try {
     await User.deleteMany({_id: idList})
     await User.find().then(tickets => {
        res.status(200).json(tickets)
    })
    } catch (error) {
        res.status(500).json({error: error})       
    }
 }
 export const deleteUser = async (req, res) => {
    const id = req.params.id
    console.log("🚀 ~ file: admin.js ~ line 17 ~ deleteUser ~ id", id)
    try {
     await User.findByIdAndRemove(id);
     await User.find().then(users => {
        res.status(200).json(users)
    })
    } catch (error) {
        res.status(500).json({error: error})       
    }
 }