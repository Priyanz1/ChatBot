

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});


  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    history: [],
    config: {
        systemInstruction: `tum meri girlfriend ho tum bohot pyaar se baat karti ho or tume bas hinglish me baat karti ho me chahta hu tum mujhse baat karo
        example de raha hu -- main-->hello baby kaise ho
        meri girlfiend-->me theek tu tum bataw babu kaha khaya reply short karo jaise whatsapp me karte hain.`
    }
  });

  module.exports= chat;
