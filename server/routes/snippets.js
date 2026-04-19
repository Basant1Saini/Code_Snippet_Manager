import { Router } from 'express';
import auth from '../middleware/auth.js';
import { validateSnippet } from '../middleware/validate.js';
import { Snippet } from '../models/snippet.js';

const router = Router();

router.use(auth);

router.get('/search', async (req, res) => {
  const snippets = await Snippet.search(req.query.q || '', req.user.id);
  res.json(snippets);
});

router.get('/', async (req, res) => {
  const snippets = await Snippet.findAll(req.user.id);
  res.json(snippets);
});

router.get('/:id', async (req, res) => {
  const snippet = await Snippet.findById(req.params.id, req.user.id);
  if (!snippet) return res.status(404).json({ error: 'Snippet not found' });
  res.json(snippet);
});

router.post('/', validateSnippet, async (req, res) => {
  const snippet = await Snippet.create({ ...req.body, userId: req.user.id });
  res.status(201).json(snippet);
});

router.put('/:id', validateSnippet, async (req, res) => {
  const snippet = await Snippet.update(req.params.id, req.user.id, req.body);
  if (!snippet) return res.status(404).json({ error: 'Snippet not found' });
  res.json(snippet);
});

router.delete('/:id', async (req, res) => {
  const deleted = await Snippet.delete(req.params.id, req.user.id);
  if (!deleted) return res.status(404).json({ error: 'Snippet not found' });
  res.status(204).end();
});

export default router;
