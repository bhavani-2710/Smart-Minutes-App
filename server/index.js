import { pipeline } from '@xenova/transformers';
import axios from 'axios';
import crypto from 'crypto';
import express from 'express';
import fs from 'fs/promises';
import { tmpdir } from 'os';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

// Helper to download file from Cloudinary to local tmp dir
async function downloadFile(fileUrl) {
  const tmpFilePath = path.join(tmpdir(), crypto.randomUUID() + '.mp3');
  const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
  await fs.writeFile(tmpFilePath, Buffer.from(response.data));
  return tmpFilePath;
}

app.post('/process-audio', async (req, res) => {
  try {
    const { cloudinaryUrl } = req.body;
    if (!cloudinaryUrl) return res.status(400).json({ error: 'Missing cloudinaryUrl' });

    const audioPath = await downloadFile(cloudinaryUrl);

    const transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-tiny');
    const transcript = await transcriber(audioPath);
    const transcription = transcript.text;

    const summarizer = await pipeline('summarization', 'Xenova/distilbart-cnn-12-6');
    const summaryResult = await summarizer(transcription);
    const summary = summaryResult[0].summary_text;

    return res.json({ transcription, summary });
  } catch (err) {
    console.error('Error processing audio:', err);
    res.status(500).json({ error: 'Failed to process audio' });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
