import express from 'express';
import {signUp, getAccount, signIn, editAccount, deleteAccount } from '../controllers/accountsController';

const router = express.Router();

router.get('/:id?', getAccount)
router.post('/sign-up', signUp)
router.post('/sign-in', signIn)
router.put('/edit/:id', editAccount)
router.delete('/delete/:id', deleteAccount)


export default router;