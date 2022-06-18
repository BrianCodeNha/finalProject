import express from 'express';
import { getUser } from '../controller/authenticatedUser.js';
import { createCheckTicket, getCheckTicket } from '../controller/checkTicket.js';
import { deleteTicket, getTicket } from '../controller/ticket.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('admin Panel!')
})

router.get('/user', getUser);

router.get('/ticket', getTicket)

router.delete('/ticket/:id', deleteTicket)

router.get('/checkTicket', getCheckTicket)

router.post('/checkticket', createCheckTicket)

export default router;