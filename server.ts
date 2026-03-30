import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Configure multer for file uploads
  const upload = multer({ storage: multer.memoryStorage() });

  app.use(express.json());

  // API Routes
  app.post('/api/analyze-scan', upload.single('scan'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No scan file uploaded' });
      }

      const model = 'gemini-3-flash-preview';
      const prompt = `
        You are a clinical radiologist specializing in SPECT imaging. 
        Analyze this SPECT scan and provide a structured report including:
        1. Core Findings: Key observations from the scan.
        2. Differential Diagnosis: Potential conditions based on the findings.
        3. Recommended Actions: Next steps for the clinician.
        4. Confidence Score: Your confidence in this analysis (0-100%).
        
        Format the response as a JSON object with these keys: 
        "findings" (array of strings), 
        "differential" (array of strings), 
        "recommendations" (array of strings), 
        "confidence" (number).
      `;

      const imagePart = {
        inlineData: {
          data: req.file.buffer.toString('base64'),
          mimeType: req.file.mimetype,
        },
      };

      const response = await ai.models.generateContent({
        model,
        contents: { parts: [imagePart, { text: prompt }] },
        config: {
          responseMimeType: 'application/json',
        },
      });

      const result = JSON.parse(response.text || '{}');
      res.json(result);
    } catch (error) {
      console.error('Analysis error:', error);
      res.status(500).json({ error: 'Failed to analyze scan' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
