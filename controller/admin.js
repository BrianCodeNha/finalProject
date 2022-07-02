import { CheckTicket } from "../model/CheckTicket.js";
import { User } from "../model/User.js";


export const updateUser = async(req, res) => {    
    console.log("🚀 ~ file: ticket.js ~ line 42 ~ addTicket ~ req", req.body)
       try {
        const updatedUser = req.body;
        const id = updatedUser.id;
        await CheckTicket.findByIdAndUpdate(id, updatedUser)
        await CheckTicket.find().then(users => {
            res.status(200).json(users)
        })
       } catch (error) {
           res.status(500).json({error: error})       
       } 
    }

export const updateVeDo = async(req, res) => {    
    console.log("🚀 ~ file: ticket.js ~ line 42 ~ addTicket ~ req", req.body)
       try {
        const updatedVedo = req.body;
        const id = updatedVedo.id;
        await CheckTicket.findByIdAndUpdate(id, updatedVedo)
        await CheckTicket.find().then(users => {
            res.status(200).json(users)
        })
       } catch (error) {
           res.status(500).json({error: error})       
       } 
    }

    export const deactivateUser = async(req, res) => {    
    console.log("🚀 ~ file: admin.js ~ line 19 ~ deactivateUser ~ req", req.body)
       try {
        const activeStatus = req.body.active;
        const id = req.params.id;
        await CheckTicket.findByIdAndUpdate(id, {active: activeStatus})
        await CheckTicket.find().then(users => {
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
     await CheckTicket.deleteMany({_id: idList})
     await CheckTicket.find().then(tickets => {
        res.status(200).json(tickets)
    })
    } catch (error) {
        res.status(500).json({error: error})       
    }
 }
 export const deleteUser = async (req, res) => {
    const id = req.params.id
    console.log("🚀 ~ file: admin.js ~ line 46 ~ deleteUser ~ id", id)
    try {
    await CheckTicket.findById(id).then( async (user) => {
        if(user.role !== 'admin'){
            await CheckTicket.findByIdAndRemove(id);
            await CheckTicket.find().then(users => {
                 res.status(200).json(users)
            })
        } else {
            res.status(401).send('Không thể xoá admin')
        }
    })
     
    } catch (error) {
        res.status(500).json({error: error})       
    }
 }