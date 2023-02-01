import fs from 'fs';

let rawData = fs.readFileSync('utils/projects.json');

let projects = JSON.parse(String(rawData));

console.log(projects);