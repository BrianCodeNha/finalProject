import express from 'express';
import { deactivateUser, deleteManyUsers, deleteUser, updateUser } from '../controller/admin.js';
import { addUser, createFakeUser, getUser } from '../controller/authenticatedUser.js';
import { createCheckTicket, getCheckTicket } from '../controller/checkTicket.js';
import { deleteTicket, getTicket } from '../controller/ticket.js';
import { verifyAdmin } from '../validation/validateData.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('admin Panel!')
})

// router.get('/fakeuser', createFakeUser)

router.get('/user', verifyAdmin, getUser);

router.post('/user', verifyAdmin, addUser);

router.put('/user/:id', verifyAdmin, updateUser);

router.patch('/user/:id', verifyAdmin, deactivateUser);

router.post('/user/deletemany', verifyAdmin, deleteManyUsers);

router.delete('/user/:id', verifyAdmin, deleteUser);

router.post('/checkticket', verifyAdmin, createCheckTicket)

router.get('/ticket', getTicket)

router.delete('/ticket/:id', deleteTicket)

router.get('/checkTicket', getCheckTicket)


export default router;