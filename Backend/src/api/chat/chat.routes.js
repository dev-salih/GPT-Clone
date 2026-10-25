import express from 'express'
import { createConversationController, getConversationController } from './controller/chat.controller.js';
const chatRouter = express.Router();


// /api/chat/conversation
chatRouter.post('/conversation', createConversationController);

chatRouter.get('/conversation', getConversationController);


export default chatRouter;