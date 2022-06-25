import express from 'express';
import { changePassword, createFakeUser, getCurrentUser, getUser } from '../controller/authenticatedUser.js'; // luon phai co duoi .js khi import
import { addTicket, createFakeTicket, deleteManyTicket, deleteTicket, editTicket, getTicket } from '../controller/ticket.js';
import { verifyAuthentication } from '../validation/validateData.js';

const router = express.Router();

// router. get('/fakeTicket', createFakeTicket);

router.delete('/ticket/:id', verifyAuthentication, deleteTicket)

router.post('/ticket/deletemany', verifyAuthentication, deleteManyTicket)

router.post('/password', verifyAuthentication, changePassword)

router.get('/', verifyAuthentication, getCurrentUser)

router.get('/ticket', verifyAuthentication, getTicket)

router.post('/ticket', verifyAuthentication, addTicket)

router.put('/ticket', verifyAuthentication, editTicket)


export default router;