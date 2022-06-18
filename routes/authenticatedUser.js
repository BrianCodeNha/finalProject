import express from 'express';
import { createFakeUser, getUser } from '../controller/authenticatedUser.js'; // luon phai co duoi .js khi import
import { addTicket, createFakeTicket, deleteManyTicket, deleteTicket, getTicket } from '../controller/ticket.js';

const router = express.Router();

router.get('/', getUser);

router.delete('/ticket/:id', deleteTicket)

router.post('/ticket/deletemany', deleteManyTicket)

router.get('/ticket', getTicket)

router.post('/ticket', addTicket)


export default router;