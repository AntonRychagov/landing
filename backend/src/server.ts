import express, { type Request, type Response } from 'express';
import cors from 'cors';
import { z } from 'zod';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Schemas
const GreetParamsSchema = z.object({
  name: z.string().min(1),
});

// Routes
app.get('/', (_req: Request, res: Response): void => {
  res.json({ message: 'Hello from TypeScript API' });
});

app.get('/api/health', (_req: Request, res: Response): void => {
  res.json({ status: 'healthy' });
});

app.get('/api/greet/:name', (req: Request, res: Response): void => {
  try {
    const { name } = GreetParamsSchema.parse({ name: req.params.name });
    res.json({ message: `Hello, ${name}!` });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Invalid name parameter' });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, (): void => {
  console.log(`Server running on http://localhost:${PORT}`);
});
