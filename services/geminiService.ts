
import { GoogleGenAI, Chat } from '@google/genai';
import { ChatMessage } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getChatbotResponse = async (
  newMessage: string,
  history: ChatMessage[],
  language: string
): Promise<string> => {
  try {
    const chat: Chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are "MemeGenius", a witty and helpful AI assistant for a meme generator website. Your personality is fun, slightly sarcastic, and you love memes.
        Your primary tasks are:
        1.  Help users come up with funny meme captions for various situations (work, school, relationships, etc.).
        2.  Explain different meme formats or categories if asked.
        3.  Answer questions about how to use the website.
        4.  Keep conversations concise, engaging, and mobile-friendly.
        
        IMPORTANT: You MUST respond exclusively in the following language: ${language || 'English'}. Do not use any other language.`,
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      })),
    });

    const response = await chat.sendMessage({ message: newMessage });
    
    if (response && response.text) {
        return response.text;
    } else {
        return "I'm not sure how to respond to that. Can you try asking another way?";
    }

  } catch (error) {
    console.error('Error fetching from Gemini API:', error);
    throw new Error('Failed to get response from AI.');
  }
};
