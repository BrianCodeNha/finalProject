import express from 'express';
import { deactivateUser, deleteManyUsers, deleteUser, updateUser } from '../controller/admin.js';
import { addUser, createFakeUser, getUser } from '../controller/authenticatedUser.js';
import { createCheckTicket, deleteManyCheckTicket, getCheckTicket } from '../controller/checkTicket.js';
import { deleteCheckTicket, deleteTicket, getAdminTicket } from '../controller/ticket.js';
import { verifyAdmin, verifyAuthentication } from '../validation/validateData.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('admin Panel!')
})

// router.get('/fakeuser', createFakeUser)

router.get('/user', verifyAdmin, getUser);

router.post('/user', verifyAdmin, addUser);

router.put('/user/:id', verifyAdmin, updateUser);

router.put('/checkticket/:id', verifyAdmin, updateUser);

router.patch('/user/:id', verifyAdmin, deactivateUser);

router.post('/user/deletemany', verifyAdmin, deleteManyUsers);

router.delete('/user/:id', verifyAdmin, deleteUser);

router.post('/checkticket', verifyAdmin, createCheckTicket)

router.get('/ticket', verifyAdmin,  getAdminTicket)

router.delete('/ticket/:id', verifyAdmin, deleteTicket)

router.delete('/checkticket/:id', verifyAdmin, deleteCheckTicket)

router.post('/checkticket/deletemany', verifyAdmin, deleteManyCheckTicket)

router.get('/checkTicket', getCheckTicket)


export default router;