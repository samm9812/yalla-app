import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/v1', apiRoutes);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Yalla API', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor Yalla corriendo en http://localhost:${PORT}`);
});