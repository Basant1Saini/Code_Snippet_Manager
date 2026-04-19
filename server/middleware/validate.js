export function validateSnippet(req, res, next) {
  const { title, code, language } = req.body;
  if (!title || !code || !language) {
    return res.status(400).json({ error: 'title, code, and language are required' });
  }
  next();
}
