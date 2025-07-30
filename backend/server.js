
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const chat = require('./chatgpt');
const zip = require('./zipBuilder');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('frontend'));
app.use('/zips', express.static('public/zips'));

app.post('/api/chat', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    if (!prompt || prompt.trim() === '') {
      return res.status(400).json({ error: "Prompt vacío" });
    }

    const response = await chat.askGPT(prompt);
    await zip.createZipFromText(response);

    res.json({ response });
  } catch (err) {
    console.error("❌ Error en /api/chat:", err.message || err);
    res.status(500).json({ error: "Error al procesar la solicitud de GPT." });
  }
});


app.get('/api/download', (req, res) => {
  const file = path.join(__dirname, '../public/zips/generated.zip');
  res.download(file);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`RamiGPT backend running on port ${PORT}`));
