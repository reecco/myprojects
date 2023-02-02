import { Router, Request, Response } from 'express';

import { readProjects, filterProject, createProject, removeProject, editProject } from '../utils';
import token from '../middlewares/token';

const router = Router();

router.get('/projects', (req: Request, res: Response) => {
  const projects = readProjects('static/projects.json');

  res.status(200).json({ projects });
});

router.get('/projects/:name', (req: Request, res: Response) => {
  const { name } = req.params;

  const project = filterProject(name, 'static/projects.json');

  if (!project)
    return res.status(404).json({ message: 'Project not found' });

  res.status(200).json({ project });
});

router.post('/project', token, (req: Request, res: Response) => {
  const { name, repo_url, stack, slug } = req.body;

  if (!name || !repo_url || !stack || !slug)
    return res.status(400).json({ message: 'Invalid syntax.' });

  const project = {
    name, repo_url, stack, slug
  };

  const result = createProject(project, 'static/projects.json');

  if (!result)
    return res.status(400).json({ message: result });

  res.status(201).json({ message: 'Project successfully added.' });
});

router.put('/project', token, (req: Request, res: Response) => {
  const { name, repo_url, stack, slug, newSlug } = req.body;

  if (!slug)
    return res.status(400).json({ message: 'Invalid syntax.' });

  const project = {
    name, repo_url, stack, slug: newSlug
  };

  const result = editProject(slug, project, 'static/projects.json');

  if (!result)
    return res.status(400).json({ message: result });

  res.status(201).json({ message: 'Project updated successfully.' });
});

router.delete('/project', token, (req: Request, res: Response) => {
  const { slug } = req.body;

  if (!slug)
    return res.status(400).json({ message: 'Invalid syntax.' });

  const result = removeProject(slug, 'static/projects.json');

  if (!result)
    return res.status(400).json({ message: result });

  res.status(200).json({ message: 'Project deleted successfully.' });
});

export default router;