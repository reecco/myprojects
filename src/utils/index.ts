import fs from 'fs';

function readProjects(path: string) {
  try {
    const rawData = fs.readFileSync(path);

    const projects = JSON.parse(String(rawData));

    return projects;
  } catch (error) {
    return error;
  }
}

function filterProject(name: string, path: string) {
  const projects = readProjects(path);

  const key = Object.keys(projects).find(index => projects[index].slug === name ? index : undefined);

  if (!key)
    return;

  return projects[key];
}

function createProject(project: object, path: string) {
  const projects = readProjects(path);

  projects.push(project);

  const data = JSON.stringify(projects);

  try {
    fs.writeFileSync(path, data);

    return true;
  } catch (error) {
    return error;
  }
}

function editProject(slug: string, project: object, path: string) {
  const projects = readProjects(path);

  const key = Object.keys(projects).find(index => projects[index].slug === slug ? index : undefined);

  if (!key)
    return;

  projects[key] = project;

  const data = JSON.stringify(projects);

  try {
    fs.writeFileSync(path, data);

    return true;
  } catch (error) {
    return error;
  }
}

function removeProject(slug: string, path: string) {
  const projects = readProjects(path);

  const key = Object.keys(projects).find(index => projects[index].slug === slug ? index : undefined);

  if (!key)
    return;

  projects.pop(key);

  const data = JSON.stringify(projects);

  try {
    fs.writeFileSync(path, data);

    return true;
  } catch (error) {
    return error;
  }
}

export { readProjects, filterProject, createProject, removeProject, editProject }