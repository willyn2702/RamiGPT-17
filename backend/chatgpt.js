const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function askGPT(prompt) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("❌ Error en OpenAI API:", error.message || error);
    throw new Error("No se pudo generar respuesta desde GPT.");
  }
}

module.exports = { askGPT };
