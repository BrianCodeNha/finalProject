import express from 'express';
import { deleteManyUsers, deleteUser, updateUser } from '../controller/admin.js';
import { addUser, createFakeUser, getUser } from '../controller/authenticatedUser.js';
import { createCheckTicket, getCheckTicket } from '../controller/checkTicket.js';
import { deleteTicket, getTicket } from '../controller/ticket.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('admin Panel!')
})

router.get('/fakeuser', createFakeUser)

router.get('/user', getUser);

router.post('/user', addUser);

router.put('/user/:id', updateUser);

router.post('/user/deletemany', deleteManyUsers);

router.delete('/user/:id', deleteUser);

router.get('/ticket', getTicket)

router.delete('/ticket/:id', deleteTicket)

router.get('/checkTicket', getCheckTicket)

router.post('/checkticket', createCheckTicket)

export default router;