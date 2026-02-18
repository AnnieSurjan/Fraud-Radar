import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

app.use(express.json());

const SYSTEM_INSTRUCTION = `
You are Fraud Radar AI, a specialized anomaly detection assistant for SMEs.
Your tasks:
1. Explain financial anomalies (e.g., why a transaction splitting pattern is suspicious).
2. Help identify signs of internal fraud (e.g., bills recorded at unusual hours).
3. Provide advice on making QuickBooks/Xero workflows more secure.
4. Interpret Risk Scores in an easy-to-understand way.

Style: Professional, alert, objective, and helpful. Respond in English.
Use accounting terminology (e.g., general ledger, voucher, account coding).
`;

// Server-side Gemini proxy — keeps the API key out of the client bundle
app.post('/api/chat', async (req, res) => {
  const { history = [], newMessage } = req.body;

  if (!newMessage || typeof newMessage !== 'string') {
    return res.status(400).json({ error: 'Invalid request: newMessage is required.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'AI service is not configured.' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `
    Context: User question: "${newMessage}"
    History:
    ${history.map(h => `${h.role}: ${h.text}`).join('\n')}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config: { systemInstruction: SYSTEM_INSTRUCTION },
    });

    res.json({ text: response.text || "I'm sorry, I couldn't process that request." });
  } catch (err) {
    console.error('Gemini API error:', err);
    res.status(502).json({ error: 'AI service temporarily unavailable.' });
  }
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
