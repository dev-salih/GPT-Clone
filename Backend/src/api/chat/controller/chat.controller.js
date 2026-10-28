import { createConversationService } from "../service/chat.service.js";


export async function createConversationController(req, res) {
  try {
    const { Question } = req.body;

    const result = await createConversationService(Question);
    
    res.status(201).json({
      success: true,
      message: 'conversation posted successfully!',
      data: result,
    });

  } catch (error) {
    throw error;
  }
}

export function getConversationController(req, res) {
  try {
    res.send('get conversations api')
  } catch (error) {
    throw error;
  }
}